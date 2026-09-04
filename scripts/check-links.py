#!/usr/bin/env python3
"""Link and orphan checker for the Paramedic Aid Memoir.

Usage:  python3 scripts/check-links.py

Checks, over every .html file in the repo:
  1. Broken internal links (href/src pointing at a file that does not exist).
  2. Orphan pages (not reachable by following links from index.html).
     Files named template.html are authoring templates and are exempt.
  3. Pages still referencing a stylesheet or script that does not exist.

Exits 1 if any broken link is found, so it can be used as a CI gate.
External (http/https) links are counted but not fetched, so the check runs
fast and gives the same answer with or without a network connection.
"""

import os
import re
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF_RE = re.compile(r'(?:href|src)="([^"]+)"')


def all_html():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d != ".git"]
        for f in files:
            if f.endswith(".html"):
                yield os.path.join(base, f)


def refs(path):
    with open(path, encoding="utf-8", errors="replace") as fh:
        return REF_RE.findall(fh.read())


def resolve(path, ref):
    """Return absolute target path for an internal ref, or None if external."""
    if ref.startswith(("http://", "https://", "#", "mailto:", "data:", "tel:")):
        return None
    target = urllib.parse.unquote(ref.split("#")[0].split("?")[0])
    if not target:
        return None
    full = os.path.normpath(os.path.join(os.path.dirname(path), target))
    if os.path.isdir(full):
        full = os.path.join(full, "index.html")
    return full


def rel(p):
    return os.path.relpath(p, ROOT)


def main():
    broken = []
    external = set()

    for page in all_html():
        for ref in refs(page):
            full = resolve(page, ref)
            if full is None:
                if ref.startswith(("http://", "https://")):
                    external.add(ref)
                continue
            if not os.path.exists(full):
                broken.append((rel(page), ref))

    # Reachability from the landing page.
    index = os.path.join(ROOT, "index.html")
    seen, stack = set(), [index]
    while stack:
        page = os.path.normpath(stack.pop())
        if page in seen or not os.path.exists(page):
            continue
        seen.add(page)
        for ref in refs(page):
            full = resolve(page, ref)
            if full and full.endswith(".html") and os.path.exists(full):
                stack.append(full)

    orphans = sorted(
        rel(p)
        for p in all_html()
        if os.path.normpath(p) not in seen
        and os.path.basename(p) != "template.html"
    )

    print(f"Pages:     {len(list(all_html()))}")
    print(f"Reachable: {len(seen)}")
    print(f"External links: {len(external)}")

    if broken:
        print(f"\nBROKEN LINKS ({len(broken)}):")
        for page, ref in sorted(broken):
            print(f"  {page} -> {ref}")
    else:
        print("\nNo broken internal links.")

    if orphans:
        print(f"\nORPHAN PAGES ({len(orphans)}) — not reachable from index.html:")
        for o in orphans:
            print(f"  {o}")
    else:
        print("No orphan pages.")

    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
