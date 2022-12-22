const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

//Setting up Audio
var audio = document.createElement('audio');
audio.src = 'test.mp3';


// Set up audio context and nodes
var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(audio);

var analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#ff0000";

window.onload = () => {
    initialSetup();
    drawSoundwave();
};

function initialSetup() {
    //Setting Up Canvas
    canvas.style.imageRendering = "crisp-edges";
    canvas.width = 1255 * window.devicePixelRatio;
    canvas.className += "canvas";

    //Reference element for the waveform
    const chromeBottom = document.querySelector(".ytp-chrome-bottom");
    document.querySelector('.ytp-progress-bar-container').appendChild(canvas);

    //removes the iv-branding because it annoys me
    const branding = document.querySelector('.iv-branding');
    if (branding) branding.remove();

    //observer to resize canvas if size changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // If the width of the ytp-chrome-bottom element changes, update the width of the canvas
            if (mutation.attributeName === 'style') {
                // Get the computed styles of the ytp-chrome-bottom element
                const styles = getComputedStyle(chromeBottom);
                // Set the width of the canvas to be the same as the width of the ytp-chrome-bottom element
                canvas.width = parseInt(styles.width, 10) * window.devicePixelRatio;
                //redraws the soundwave because it gets resetted
                drawSoundwave();
            }
        });
    });

    // Start observing the ytp-chrome-bottom element
    observer.observe(chromeBottom, {
        attributes: true,
    });

    drawSoundwave();
}

function drawSoundwave() {
    // Get audio data
    var data = new Uint8Array(analyser.frequencyBinCount);
    console.log(audio);
    console.log(source);
    console.log(analyser);
    console.log(data);
    analyser.getByteTimeDomainData(data);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the waveform
    ctx.beginPath();
    for (var i = 0; i < data.length; i++) {
        var x = canvas.width * (i / data.length);
        var y = (data[i] / 255) * canvas.height;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    /*const steps = 256;
    for (let i = 0; i < steps; i++) {
        const amplitude = Math.floor(Math.random() * (100 - 0 + 1)) * -1;
        const width = (canvas.width / steps);
        ctx.fillRect(i * width, canvas.height, width, amplitude);
        //console.log("x: "+i*width+" width: "+width)
    }
    //console.log(canvas.width)*/
}