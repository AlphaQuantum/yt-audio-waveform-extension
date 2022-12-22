import WaveSurfer from "./src/js/wavesurfer.js";

window.onload = () => {
    waveformContainer();
    drawSoundwave();
};

function drawSoundwave() {
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple'
    });

    wavesurfer.load('test.mp3');
}

function waveformContainer() {
    // Select the progress bar container
    const chromeBottom = document.querySelector(".ytp-chrome-bottom");
    var div = document.createElement('div');
    div.id = "waveform";
    div.className += "waveform";

    const branding = document.querySelector('.iv-branding');
    if (branding)
        branding.remove();

    //observer to resize canvas if size changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // If the width of the ytp-chrome-bottom element changes, update the width of the canvas
            if (mutation.attributeName === 'style') {
                // Get the computed styles of the ytp-chrome-bottom element
                const styles = getComputedStyle(chromeBottom);
                // Set the width of the canvas to be the same as the width of the ytp-chrome-bottom element
                div.width = parseInt(styles.width, 10) * window.devicePixelRatio;
                //redraws the soundwave because it gets resetted
                //drawSoundwave();
            }
        });
    });

    // Start observing the ytp-chrome-bottom element
    if (chromeBottom) {
        observer.observe(chromeBottom, {
            attributes: true,
        });
    }


    // Append the canvas to the progress bar
    document.querySelector('.ytp-progress-bar-container').appendChild(div);
}
