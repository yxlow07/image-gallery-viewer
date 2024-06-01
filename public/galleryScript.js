document.addEventListener('DOMContentLoaded', () => {
    const pathArray = window.location.pathname.split('/');
    const folder = pathArray[pathArray.length - 1];

    fetch(`get/img/${folder}`)
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach((image, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = `images/${folder}/${image}`;
                imgElement.alt = `Page ${index + 1}`;
                imgElement.onclick = () => openViewer(index + 1);
                imgElement.classList.add('w-48', 'cursor-pointer', 'border-2', 'border-transparent', 'hover:border-black');

                const linkElement = document.createElement('a');
                linkElement.href = `/${folder}/${index + 1}`;
                linkElement.appendChild(imgElement);

                gallery.appendChild(linkElement);
            });
        });
});
