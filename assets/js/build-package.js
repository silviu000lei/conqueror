document.querySelectorAll('.items .item').forEach((item) => {
    item.style.backgroundImage = "url('" + item.getAttribute('data-bg') + "')";
})

let bundleData = [];
const bundleEl = document.querySelector('.bundle');
const bundleItemsEl = bundleEl.querySelector('.items');
const bundleAddOrderEl = bundleEl.querySelector('.add-order');

document.querySelectorAll('.items .item button.add-challenge').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.item');
        addItemToBundle(item);
        refresh_bundle();
    })
})

function addItemToBundle(item) {
    if (bundleData.length >= 4) {
        return;
    }
    const emblem = item.getAttribute("data-emblem");
    const title = item.querySelector('.item-title').innerText;
    if (bundleData.some(elem => elem.emblem === emblem)) {
        return;
    }
    bundleData.push({
        emblem,
        title
    })
}

function refresh_bundle() {
    bundleItemsEl.innerHTML = "";
    [0, 1, 2, 3].forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        const img = document.createElement(bundleData[item] ? 'img' : 'span');
        img.src = bundleData[item]?.emblem;
        img.alt = bundleData[item]?.title || '';
        div.appendChild(img);

        if (bundleData[item]?.emblem) {
            const deleteButton = document.createElement('button');
            deleteButton.className = "delete";
            deleteButton.textContent = 'X';
            deleteButton.onclick = () => removeItem(bundleData[item].emblem);
            div.appendChild(deleteButton);
        }

        bundleItemsEl.appendChild(div);
    });
    if(bundleData.length === 4){
        bundleAddOrderEl.style.display = 'block';
    }
    else{
        bundleAddOrderEl.style.display = 'none';
    }

    if (bundleData.length > 0) {
        bundleEl.style.display = "flex";
    } else {
        bundleEl.style.display = "none";
    }
}

function removeItem(emblem) {
    bundleData = bundleData.filter(item => item.emblem !== emblem);
    refresh_bundle()
}

function addToBasket() {
    localStorage.basket = JSON.stringify(bundleData);
    bundleData = [];
    refresh_bundle();
}