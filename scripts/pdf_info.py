import sys, pymupdf
for p in sys.argv[1:]:
    d = pymupdf.open(p)
    print("==", p, "pages:", d.page_count)
    toc = d.get_toc()
    print("toc entries:", len(toc))
    for lvl, title, page in toc[:400]:
        print("  " * (lvl - 1) + f"{title}  (p{page})")
