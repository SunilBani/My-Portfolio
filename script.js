document.addEventListener("DOMContentLoaded", () => {
    // 1. Terminal Typing Effect
    const terminalBody = document.getElementById("terminalBody");
    const terminalLines = [
        { text: "guest@kali:~$ ./get_info.sh", delay: 800, isCommand: true },
        { text: "Loading profile data...", delay: 400, isCommand: false },
        { text: "...", delay: 600, isCommand: false },
        { text: "[+] Connection established.", delay: 300, isCommand: false },
        { text: "[+] Extracting data...", delay: 500, isCommand: false },
        { text: "", delay: 200, isCommand: false },
        { text: "NAME     : Sunil Bani", delay: 300, isCommand: false },
        { text: "ROLE     : Junior PenTester | Security Researcher", delay: 300, isCommand: false },
        { text: "STATUS   : Active", delay: 300, isCommand: false },
        { text: "FOCUS    : Network Security, Vulnerability Analysis", delay: 300, isCommand: false },
        { text: "CERT     : CEH (In Progress)", delay: 300, isCommand: false },
        { text: "", delay: 200, isCommand: false },
        { text: "guest@kali:~$ ", delay: 500, isCommand: true, keepCursor: true }
    ];

    async function typeLines() {
        terminalBody.innerHTML = "";
        
        for (let i = 0; i < terminalLines.length; i++) {
            const lineData = terminalLines[i];
            const lineEl = document.createElement("div");
            lineEl.style.marginBottom = "0.2rem";
            
            if (!lineData.isCommand && lineData.text !== "") {
                lineEl.style.color = "var(--text-muted)";
            }
            if (lineData.text.startsWith("[+]")) {
                lineEl.style.color = "var(--primary)";
            }

            terminalBody.appendChild(lineEl);

            if (lineData.isCommand) {
                lineEl.style.color = "var(--primary)";
                // Animate typing
                let currentText = "";
                // Create a temporary cursor
                const tempCursor = document.createElement("span");
                tempCursor.className = "cursor";
                
                for (let char of lineData.text) {
                    currentText += char;
                    lineEl.innerHTML = currentText;
                    lineEl.appendChild(tempCursor);
                    await new Promise(r => setTimeout(r, Math.random() * 50 + 20)); // typing speed
                }
                
                if(!lineData.keepCursor) {
                    tempCursor.remove();
                }

            } else {
                lineEl.innerText = lineData.text;
            }

            // Wait before next line
            if (i < terminalLines.length - 1) {
                await new Promise(r => setTimeout(r, lineData.delay));
            }
        }
    }

    // Start typing effect slightly after load
    setTimeout(typeLines, 500);


    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });


    // 3. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach(section => {
        observer.observe(section);
    });

    // 4. Smooth Scrolling for internal links (custom handling to offset navbar heights)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 5. Particles JS Initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff41" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ff41",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 6. Chart.js Skills Radar
    const ctx = document.getElementById('skillsChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Vuln Management', 'Network Sec', 'Exploitation', 'OS & SecOps', 'Forensics', 'Web App Sec'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 80, 75, 60, 70],
                    backgroundColor: 'rgba(0, 255, 65, 0.2)',
                    borderColor: '#00ff41',
                    pointBackgroundColor: '#00ff41',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00ff41',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#8b949e', font: { family: 'Fira Code', size: 11 } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // 7. Secure Download Animation
    const downloadBtn = document.getElementById('downloadResumeBtn');
    const downloadProgressContainer = document.getElementById('downloadProgress');
    const downloadProgressBar = document.querySelector('.progress-bar');
    const downloadBtnText = document.getElementById('downloadBtnText');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (downloadBtn.classList.contains('downloading')) return;
            
            downloadBtn.classList.add('downloading');
            downloadProgressContainer.classList.add('active');
            downloadBtnText.innerText = "Authenticating...";
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                downloadProgressBar.style.width = progress + '%';
                
                if (progress > 30 && progress < 60) {
                    downloadBtnText.innerText = "Establishing TLS...";
                } else if (progress >= 60 && progress < 100) {
                    downloadBtnText.innerText = "Downloading...";
                } else if (progress >= 100) {
                    clearInterval(interval);
                    downloadBtnText.innerText = "Download Complete";
                    setTimeout(() => {
                        // Reset button
                        downloadProgressContainer.classList.remove('active');
                        downloadProgressBar.style.width = '0%';
                        downloadBtnText.innerText = "Securely Download Resume";
                        downloadBtn.classList.remove('downloading');
                        
                        alert("Resume download process simulated successfully!\n(You can link the actual PDF file here later.)");
                    }, 2000);
                }
            }, 300);
        });
    }

    // 8. Interactive Shell
    const shellInput = document.getElementById('shellInput');
    const shellBody = document.getElementById('shellBody');
    const commands = {
        'help': 'Available commands: help, whoami, clear, about, ls',
        'whoami': 'Sunil Bani - Junior PenTester & Security Researcher',
        'clear': '',
        'about': 'Cyber Security Enthusiast and MCA graduate actively learning penetration testing.',
        'ls': 'about.sh  skills.sh  projects/  certs.txt'
    };

    if (shellInput) {
        shellInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const inputVal = this.value.trim().toLowerCase();
                const outputDiv = document.createElement('div');
                outputDiv.className = 'shell-output';
                
                // Echo command
                const echoCmd = document.createElement('div');
                echoCmd.innerHTML = `<span class="prompt">guest@sys:~$</span> ${this.value}`;
                
                let responseText = `bash: ${inputVal}: command not found`;
                if (inputVal === '') {
                    responseText = '';
                } else if (inputVal.startsWith('sudo')) {
                    responseText = `guest is not in the sudoers file. This incident will be reported.`;
                } else if (inputVal.startsWith('nano')) {
                    const filename = inputVal.split(' ')[1] || 'New Buffer';
                    
                    // Hide past terminal history
                    Array.from(shellBody.children).forEach(child => child.style.display = 'none');
                    
                    // Inject Nano Interface
                    const nanoDiv = document.createElement('div');
                    nanoDiv.id = 'nanoInterface';
                    nanoDiv.style.cssText = 'display: flex; flex-direction: column; height: 100%; width: 100%; background: var(--bg-main); color: var(--text-main); font-family: monospace; padding: 5px; box-sizing: border-box;';
                    nanoDiv.innerHTML = `
                        <div style="background: var(--text-muted); color: var(--bg-main); text-align: center; font-weight: bold; margin-bottom: 5px; padding: 2px;">GNU nano 6.2 &nbsp;&nbsp;&nbsp;&nbsp; File: ${filename}</div>
                        <textarea id="nanoEditor" style="flex: 1; min-height: 150px; background: transparent; border: none; color: var(--primary); outline: none; resize: none; font-family: inherit; font-size: inherit; width: 100%; padding: 5px;" spellcheck="false"></textarea>
                        <div style="margin-top: auto; font-size: 0.8rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; color: var(--text-muted); padding-top: 5px;">
                            <div><b style="color:var(--text-main)">^G</b> Get Help</div>
                            <div><b style="color:var(--text-main)">^O</b> Write</div>
                            <div><b style="color:var(--text-main)">^X</b> Exit</div>
                        </div>
                    `;
                    shellBody.appendChild(nanoDiv);
                    this.value = ''; // clear input early
                    
                    setTimeout(() => {
                        const editor = document.getElementById('nanoEditor');
                        if (editor) editor.focus();
                        
                        const handleNanoExit = function(e) {
                            if (e.ctrlKey && e.key.toLowerCase() === 'x') {
                                e.preventDefault();
                                document.removeEventListener('keydown', handleNanoExit);
                                nanoDiv.remove();
                                
                                // Restore terminal
                                Array.from(shellBody.children).forEach(child => child.style.display = '');
                                
                                // Log the action
                                const exitOutput = document.createElement('div');
                                exitOutput.className = 'shell-output';
                                exitOutput.innerHTML = `<span class="prompt">guest@sys:~$</span> ${inputVal}<br><span style="color: var(--text-muted);">[ wrote ${filename} ]</span>`;
                                shellBody.insertBefore(exitOutput, document.querySelector('.shell-input-line'));
                                
                                shellInput.focus();
                                shellBody.scrollTop = shellBody.scrollHeight;
                            }
                        };
                        document.addEventListener('keydown', handleNanoExit);
                    }, 50);
                    
                    return; // exit the standard terminal flow
                } else if (commands.hasOwnProperty(inputVal)) {
                    responseText = commands[inputVal];
                }

                if (inputVal === 'clear') {
                    const existingOutputs = shellBody.querySelectorAll('.shell-output');
                    existingOutputs.forEach(el => el.remove());
                } else {
                    const responseDiv = document.createElement('div');
                    responseDiv.style.color = "var(--text-muted)";
                    responseDiv.innerText = responseText;
                    
                    outputDiv.appendChild(echoCmd);
                    if (responseText) outputDiv.appendChild(responseDiv);
                    
                    shellBody.insertBefore(outputDiv, this.parentElement);
                }
                
                this.value = '';
                shellBody.scrollTop = shellBody.scrollHeight;
            }
        });
    }
    
    // 9. Decrypt Text Effect on Scroll
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const decryptObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('decrypted')) {
                const el = entry.target;
                const originalText = el.getAttribute('data-original');
                el.classList.add('decrypted');
                
                let iteration = 0;
                let maxIterations = originalText.length;
                
                const interval = setInterval(() => {
                    el.innerText = originalText
                        .split('')
                        .map((letter, index) => {
                            if(index < iteration) return originalText[index];
                            if(letter === ' ') return ' ';
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                    
                    if (iteration >= maxIterations) {
                        clearInterval(interval);
                    }
                    iteration += 2; // speed of decryption
                }, 30);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.decrypt-text').forEach(el => {
        decryptObserver.observe(el);
    });

    // 10. System Boot Pre-loader
    const preloader = document.getElementById('preloader');
    const loaderTerminal = document.getElementById('loaderTerminal');
    const bootSequence = [
        "Initializing boot sequence...",
        "[OK] Mounted Storage: /dev/sda1",
        "[OK] Starting Network Manager",
        "[OK] Reached target Network is Online",
        "Loading kernel modules...",
        "[WARN] Bypassing firewall... Access Granted.",
        "Establishing secure connection to portfolio...",
        "Welcome, Subject: Sunil Bani"
    ];

    if (preloader && loaderTerminal) {
        let bText = "";
        
        async function runBoot() {
            for (let i = 0; i < bootSequence.length; i++) {
                bText += bootSequence[i] + "\n";
                loaderTerminal.innerText = bText;
                await new Promise(r => setTimeout(r, Math.random() * 200 + 100));
            }
            await new Promise(r => setTimeout(r, 600));
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }
        
        // Start boot sequence immediately
        runBoot();
    }

    // 11. Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('a, button, input, .hamburger').forEach(el => {
            el.addEventListener('mouseover', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseout', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // 12. Matrix Rain Easter Egg
    const logoNode = document.querySelector('.logo');
    const matrixCanvas = document.getElementById('matrixCanvas');
    let logoClicks = 0;

    if (logoNode && matrixCanvas) {
        const mCtx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const fontSize = 16;
        let columns = Math.floor(matrixCanvas.width / fontSize);
        let drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;
        let rainInterval;

        function drawMatrix() {
            mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            mCtx.fillStyle = '#00ff41';
            mCtx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            columns = Math.floor(matrixCanvas.width / fontSize);
            drops = [];
            for (let x = 0; x < columns; x++) drops[x] = 1;
        });

        logoNode.addEventListener('click', (e) => {
            e.preventDefault();
            logoClicks++;
            if (logoClicks === 3) {
                // Trigger Rain
                logoClicks = 0;
                matrixCanvas.style.opacity = '1';
                rainInterval = setInterval(drawMatrix, 33);
                
                setTimeout(() => {
                    matrixCanvas.style.opacity = '0';
                    setTimeout(() => {
                        clearInterval(rainInterval);
                        mCtx.clearRect(0,0,matrixCanvas.width,matrixCanvas.height);
                    }, 2000);
                }, 5000); // Effect lasts for 5 seconds
            }
        });
    }

    // 13. Root Mode Toggle (Privilege Escalation)
    const rootModeToggle = document.getElementById('rootModeToggle');
    const modeLabels = document.querySelectorAll('.mode-label');
    if (rootModeToggle) {
        rootModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('root-mode');
                modeLabels[0].style.color = "var(--text-muted)";
                modeLabels[1].style.color = "var(--primary)";
                
                // Add a visual flash
                const flash = document.createElement('div');
                flash.style.position = 'fixed';
                flash.style.top = '0'; flash.style.left = '0';
                flash.style.width = '100vw'; flash.style.height = '100vh';
                flash.style.backgroundColor = 'rgba(255,0,0,0.3)';
                flash.style.zIndex = '99999';
                flash.style.pointerEvents = 'none';
                flash.style.transition = 'opacity 0.5s';
                document.body.appendChild(flash);
                setTimeout(() => { flash.style.opacity = '0'; }, 50);
                setTimeout(() => { flash.remove(); }, 550);

                if(window.audioContext && window.audioEnabled) playSound(150, 'sawtooth', 0.5, 0.5); // Error/Alert sound
            } else {
                document.body.classList.remove('root-mode');
                modeLabels[0].style.color = "var(--primary)";
                modeLabels[1].style.color = "var(--text-muted)";
                if(window.audioContext && window.audioEnabled) playSound(400, 'sine', 0.1, 0.1);
            }
        });
        modeLabels[0].style.color = "var(--primary)"; // Initial state
    }

    // 14. Audio Synthesis Context
    const audioToggle = document.getElementById('audioToggle');
    window.audioEnabled = false;
    window.audioContext = null;

    function initAudio() {
        if(!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(freq, type = 'sine', duration = 0.1, vol = 0.05) {
        if (!window.audioEnabled || !window.audioContext) return;
        const osc = window.audioContext.createOscillator();
        const gain = window.audioContext.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, window.audioContext.currentTime);
        gain.gain.setValueAtTime(vol, window.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, window.audioContext.currentTime + duration);
        osc.connect(gain);
        gain.connect(window.audioContext.destination);
        osc.start();
        osc.stop(window.audioContext.currentTime + duration);
    }

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            window.audioEnabled = !window.audioEnabled;
            if (window.audioEnabled) {
                initAudio();
                audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                audioToggle.classList.add('active');
                playSound(600, 'sine', 0.1, 0.1);
            } else {
                audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                audioToggle.classList.remove('active');
            }
        });

        // Add sounds to interactive elements
        document.querySelectorAll('a, button, input, .hamburger').forEach(el => {
            el.addEventListener('mouseenter', () => playSound(800, 'sine', 0.05, 0.01));
            el.addEventListener('click', () => playSound(400, 'square', 0.1, 0.02));
        });
    }

    // 15. Live Network Map Simulation
    const netCanvas = document.getElementById('networkMapCanvas');
    if (netCanvas) {
        const nCtx = netCanvas.getContext('2d');
        const container = netCanvas.parentElement;
        
        function resizeNetCanvas() {
            netCanvas.width = container.clientWidth;
            netCanvas.height = container.clientHeight;
        }
        window.addEventListener('resize', resizeNetCanvas);
        resizeNetCanvas();

        let packets = [];
        const maxPackets = 15;

        function drawNetwork() {
            nCtx.clearRect(0, 0, netCanvas.width, netCanvas.height);
            
            // Draw random "servers" / nodes
            const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
            const rootMode = document.body.classList.contains('root-mode');
            const color = rootMode ? '#ff003c' : '#00ff41'; // Fallbacks just in case

            nCtx.fillStyle = color;
            nCtx.globalAlpha = 0.5;
            // Node points
            const nodes = [
                {x: 20, y: netCanvas.height/2},
                {x: netCanvas.width/2, y: 20},
                {x: netCanvas.width/2, y: netCanvas.height - 20},
                {x: netCanvas.width - 20, y: netCanvas.height/2}
            ];
            
            nodes.forEach(n => {
                nCtx.beginPath();
                nCtx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                nCtx.fill();
            });

            // Generate occasionally
            if (Math.random() > 0.9 && packets.length < maxPackets) {
                const isMalicious = Math.random() > 0.8;
                packets.push({
                    x: 0,
                    y: netCanvas.height * Math.random(),
                    targetX: netCanvas.width,
                    targetY: netCanvas.height * Math.random(),
                    speed: Math.random() * 3 + 1,
                    color: isMalicious ? '#ff3366' : color,
                    progress: 0
                });
            }

            // Draw and update packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += 0.01 * p.speed;
                
                const currX = p.x + (p.targetX - p.x) * p.progress;
                const currY = p.y + (p.targetY - p.y) * p.progress;

                nCtx.beginPath();
                nCtx.fillStyle = p.color;
                nCtx.globalAlpha = 1 - p.progress;
                nCtx.arc(currX, currY, 2, 0, Math.PI * 2);
                nCtx.fill();

                // Draw trail
                nCtx.beginPath();
                nCtx.strokeStyle = p.color;
                nCtx.lineWidth = 1;
                nCtx.globalAlpha = (1 - p.progress) * 0.5;
                nCtx.moveTo(p.x, p.y);
                nCtx.lineTo(currX, currY);
                nCtx.stroke();

                if (p.progress >= 1) packets.splice(i, 1);
            }
            nCtx.globalAlpha = 1;
        }

        setInterval(drawNetwork, 30);
    }

    // 16. 3D Tilt Effect on Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease'; // Add smooth return transition
            setTimeout(() => { card.style.transition = ''; }, 500); // Remove transition to not lag hover
        });
    });
});
