document.addEventListener('DOMContentLoaded', () => {
    fetch('/galleries')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(({ folder, image }) => {
                const divElement = document.createElement('div');
                divElement.classList.add('img-gallery'); // Add Tailwind classes to this div

                const imgElement = document.createElement('img');
                imgElement.src = `images/${folder}/${image}`;
                imgElement.alt = folder;
                imgElement.classList.add('w-full'); // Add Tailwind classes to the image
                imgElement.onclick = () => {
                    window.location.href = `/${folder}`;
                };

                const folderNameElement = document.createElement('p');
                folderNameElement.textContent = folder;
                folderNameElement.classList.add('img-txt'); // Add Tailwind classes to center text and add margin top

                divElement.appendChild(imgElement);
                divElement.appendChild(folderNameElement); // Append the folder name element below the image
                gallery.appendChild(divElement);
            });
        });
});
