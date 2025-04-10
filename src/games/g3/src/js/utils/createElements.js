function createElement(tag, className, attributes = {}, text = '') {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    el.textContent = text;
    return el;
}

export {
    createElement
}