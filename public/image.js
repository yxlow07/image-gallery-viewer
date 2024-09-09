"use strict";

// TODO: Make scrolling available with WASD Keys

let scroll_speed = 300;

document.addEventListener('DOMContentLoaded', () => {
    const pathArray = window.location.pathname.split('/');
    const folder = pathArray[pathArray.length - 2];
    const imageNumber = parseInt(pathArray[pathArray.length - 1]);
    let scrollInterval = null;
    document.title = imageNumber + " - " + decodeURI(folder);
    document.getElementById('title').innerText = decodeURI(folder);

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    const img = document.getElementById('img');

    prevButton.href = `/${folder}/${imageNumber - 1 > 0 ? imageNumber - 1 : 1}`;
    nextButton.href = `/${folder}/${imageNumber + 1}`;
    backButton.href = `/${folder}`;

    // Optional: Check if previous or next button should be disabled
    fetch(`/get/img/${folder}`)
        .then(response => response.json())
        .then(images => {
            if (imageNumber <= 1) {
                prevButton.classList.add('opacity-50', 'cursor-not-allowed');
                prevButton.href = `/${folder}`;
            }
            if (imageNumber > images.length-1) {
                nextButton.classList.add('opacity-50', 'cursor-not-allowed');
                nextButton.href = `/${folder}`;
            }
        });

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') && prevButton.href !== '#') {
            window.location.href = prevButton.href;
        }
        if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') && nextButton.href !== '#') {
            window.location.href = nextButton.href;
        }
        if (event.key === 's' || event.key === 'S') {
            window.scrollBy({
                top: scroll_speed,
                left: 0,
                behavior: 'smooth'
            });
        }
        if (event.key === 'w' || event.key === 'W') {
            window.scrollBy({
                top: -scroll_speed,
                left: 0,
                behavior: 'smooth'
            });
        }
    });

    img.addEventListener('click', (event) => {
        const rect = img.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const imageWidth = rect.width;
        
        if (clickX > imageWidth / 2 && nextButton.href !== '#') {
            window.location.href = nextButton.href;
        } else if (clickX <= imageWidth / 2 && prevButton.href !== '#') {
            window.location.href = prevButton.href;
        }
    })
});
