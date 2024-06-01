"use strict";

// TODO: Make scrolling available with WASD Keys

document.addEventListener('DOMContentLoaded', () => {
    const pathArray = window.location.pathname.split('/');
    const folder = pathArray[pathArray.length - 2];
    const imageNumber = parseInt(pathArray[pathArray.length - 1]);
    document.title = imageNumber + " - " + decodeURI(folder);
    document.getElementById('title').innerText = decodeURI(folder);

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    const settingsButton = document.getElementById('settings-button');
    const modal = document.getElementById('scrollSpeedModal');

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
    });
});
