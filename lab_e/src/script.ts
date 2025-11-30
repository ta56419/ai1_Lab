const msg: string = "Hello!";
alert(msg);

type StyleEntry = {
    id: string;
    name: string;
    file: string;
};

const styles: StyleEntry[] = [
    { id: "style-1", name: "Style 1", file: "/style-1.css" },
    { id: "style-2", name: "Style 2", file: "/style-2.css" },
    { id: "style-3", name: "Style 3", file: "/style-3.css" }
];

let currentStyleId: string = styles[0].id;

function getCurrentLink(): HTMLLinkElement | null {
    return document.head.querySelector('link[data-style="true"]');
}

function applyStyleById(id: string) {
    const s = styles.find(x => x.id === id);
    if (!s) return;

    const old = getCurrentLink();
    if (old) old.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = s.file;
    link.setAttribute("data-style", "true");
    link.setAttribute("data-style-id", s.id);
    document.head.appendChild(link);

    currentStyleId = s.id;
    highlightActiveLink();
}

function renderLinks() {
    const box = document.getElementById("style-links");
    if (!box) return;

    box.innerHTML = "";

    styles.forEach(s => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = s.name;
        a.setAttribute("data-link-id", s.id);
        a.style.marginLeft = "10px";

        a.addEventListener("click", (e) => {
            e.preventDefault();
            applyStyleById(s.id);
        });

        box.appendChild(a);
    });

    highlightActiveLink();
}

function highlightActiveLink() {
    const box = document.getElementById("style-links");
    if (!box) return;

    const links = box.querySelectorAll<HTMLAnchorElement>("a[data-link-id]");

    links.forEach(a => {
        if (a.getAttribute("data-link-id") === currentStyleId) {
            a.style.fontWeight = "700";
            a.style.textDecoration = "underline";
        } else {
            a.style.fontWeight = "400";
            a.style.textDecoration = "none";
        }
    });
}

function init() {
    renderLinks();
    applyStyleById(currentStyleId);
}

document.addEventListener("DOMContentLoaded", init);