document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('animated-name');
    if (!nameElement) return;

    const fullName = "N V M Sai Kalyan";
    let i = 0;
    const typingSpeed = 150; // milliseconds per character

    function typeWriter() {
        if (i < fullName.length) {
            nameElement.textContent += fullName.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor when done
            nameElement.classList.remove('typing-cursor');
        }
    }

    // Start typing after 1 second delay
    setTimeout(typeWriter, 1000);
});