const elements = {
    info: document.querySelector('#successBox'),
    error: document.querySelector('#errorBox'),
    loading: document.querySelector('#loadingBox')
};

elements.info.addEventListener('click', hideInfo);
elements.error.addEventListener('click', hideError);


export function showInfo(message) {
    elements.info.textContent = message;
    elements.info.style.display = 'block';
    setTimeout(hideInfo, 3000)
}

export function showError(message) {
    elements.error.textContent = message;
    elements.error.style.display = 'block';
    setTimeout(hideError, 3000)
}

let requests = 0;

export function beginRequest() {
    requests++;
    elements.loading.style.display = 'block';

}


export function endRequest() {
    requests--;
    if (requests === 0) {
        elements.loading.style.display = 'none';
    }
}

function hideInfo() {
    elements.info.style.display = 'none';
}

function hideError() {
    elements.error.style.display = 'none';
}