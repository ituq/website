let svgs = [];
document.addEventListener("DOMContentLoaded", function() {
    function populateGrid() {
        const container = document.getElementById('container');
        const nColumns = Math.floor(container.offsetWidth / 40); // Each SVG will occupy 40px width space
        const nRows = Math.floor(container.offsetHeight / 40); // Each SVG will occupy 40px height space
        const totalSVGs = nColumns * nRows;

        container.innerHTML = ''; // Clear existing SVGs
        svgs=[];

        for (let i = 0; i < totalSVGs; i++) {
            const svgNS = "http://www.w3.org/2000/svg";
            // Create main svg element
            const svgElem = document.createElementNS(svgNS, 'svg');
            svgElem.setAttribute('class', 'arrow');
            svgElem.setAttribute('viewBox', '0 0 100 100');
            svgElem.setAttribute('id', 'svgRotate');
            svgElem.setAttribute('xmlns', svgNS);
            svgElem.innerHTML='<svg  viewBox="0 0 100 100"><path id="svgScale" d="M 0 48.085 L 45 48.085 L 45 52.085 L 0 52.085 L 0 48.085 Z M 37.193 39.24 L 47.971 50.018 L 45.142 52.846 L 34.364 42.069 L 37.193 39.24 Z M 47.975 50.021 L 37.237 60.759 L 34.408 57.93 L 45.146 47.192 L 47.975 50.021 Z" fill="white" style=""></path></svg>'
            svgs.push(svgElem);
            // Create wrapper div

            container.appendChild(svgElem);
        }
    }

    // Populate initially
    populateGrid();

    svgs.forEach(svg => {
        const path = svg.querySelector('path'); // Assuming the path is the element to scale
        svg.currentRotation = 0;
        svg.currentTargetRotation = gaussianRandom(0.125,0.05) * 360;
        path.currentScale = 1;
        path.currentTargetScale = 0.1 + Math.random() * 0.5; // Ensures scale is between 0.5 and 1.0
    });

    // Repopulate on resize to maintain density
    window.addEventListener('resize', populateGrid);
});

function updateSvgAnimations() {
    svgs.forEach(svg => {
        const path = svg.querySelector('path');

        // Easing factor determines the speed of interpolation
        const easingFactor = 0.003; // Increased for more noticeable changes

        // Calculate the difference between current and target transformations
        const scaleDiff = path.currentTargetScale - path.currentScale;
        const rotationDiff = svg.currentTargetRotation - svg.currentRotation;

        // Adjust current transformations towards the targets
        path.currentScale += scaleDiff * easingFactor;
        svg.currentRotation += rotationDiff * easingFactor;

        // Apply the current transformations
        svg.style.transform = `rotate(${svg.currentRotation}deg)`;
        path.style.transform = `scale(${path.currentScale})`;
        // Randomly update target transformations periodically or when close to the target
        if (Math.abs(scaleDiff) < 0.05 || Math.abs(rotationDiff) < 5) { // Adjust thresholds as needed
            path.currentTargetScale = 0.5 + Math.random() * 0.5;
            svg.currentTargetRotation = gaussianRandom(0.125,0.05) * 360;
        }
    });

    // Request the next animation frame
    requestAnimationFrame(updateSvgAnimations);
}
function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

// Start the animation
requestAnimationFrame(updateSvgAnimations);
