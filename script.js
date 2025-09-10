class DreamJourneyGame {
    constructor() {
        this.currentMilestone = 0;
        this.totalMilestones = 6;
        this.completedMilestones = 0;
        this.milestoneData = this.getMilestoneData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.unlockFirstMilestone();
        this.animateMascot();
        this.positionSmallMascot();
    }

    getMilestoneData() {
        return {
            1: {
                title: "Hello whoever! This is small El from China",
                content: `
                    <div class="milestone-content">
                        <h3>Nice to meet you!</h3>
                        <p>8-yead old El's dream was to stop playing the piano so she could read HarryPotter which hidden by her under the bed.</p>
                        <p>You can see El loves reading and knows how to play the piano - fun fact!</p>
                        <p>She didn't start coding when she was in high school, at that time she wished to be a criminal novel writer.</p>
                    </div>
                `
            },
            2: {
                title: "And...",
                content: `
                    <div class="milestone-content">
                        <h3>Criminal Minds</h3>
                        <p>El loves travelling and exploring new places, and still loves reading and watching Criminal Minds(Morgan is my fav).</p>
                    </div>
                `
            },
            3: {
                title: "UNSWer",
                content: `
                    <div class="milestone-content">
                        <h3>JOB-Lifting-Sleep-Eat-Surf Ahh</h3>
                        <p>El started to power lift and wished to juggle between lifting, out-door camping and job hunting. To celebrate new year, El spent 7 days in a surfcamp, El didnt want to come back since El didnt want to work...:</p>
                        
                    </div>
                `
            },
            4: {
                title: "This year smth got changed",
                content: `
                    <div class="milestone-content">
                        <h3>What I'm Dreaming About (yES, i'M eL)</h3>
                        <p>I have big dreams and I'm working hard to make them come true:</p>
                        <ul>
                            <li><strong>Startup:</strong> I become a startup founder - MentorAll!!! An AI-powered mentor matching platform.</li>
                            <li><strong>Achievement:</strong> We got in 2025 Peter Farrell Cup UNSW TOP 10!!!</li>
                            <li><strong>Current Stage:</strong> Got 100+ users on waiting list even before our MVP launch!! yay</li>
                            <li><strong>Customer:</strong> Sydney Boy High School is our first first pilot program customer wu hou!!!</li>
                            <li><strong>Next Step:</strong> Hosting first MVP launch in-person event, which is a live mentor-mentee matching session on our platform</li>
                            And our DREAM IS TO collaborate with YOU for this EVENT!!! Devsoc_unsw! LET'S CHAT</li>
                            <li><strong>Funding Goal:</strong> Having final pitch in late Sep to catch $100k, how exciting!!!</li>
                        </ul>
                        <p>Would LOVE to chat about potential collaborations!!</p>
                    </div>
                `
            },
            5: {
                title: "PLEASE SELECT ME!!!",
                content: `
                    <div class="milestone-content">
                        <p>Wanna be in this program so bad, plxxxxxxx</p>
                    </div>
                `
            },
            6: {
                title: "📞 Let's Connect!",
                content: `
                    <div class="milestone-content">
                        <h3>Get In Touch with UNI version El, and plz let me in:0</h3>
                        <p>Let's connect and create something crazy</p>
                        <div class="contact-info">
                            <div class="contact-item">
                                <span class="contact-icon">📧</span>
                                <span class="contact-text">z5248177@ad.unsw.edu.au</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">💼</span>
                                <span class="contact-text">LinkedIn: linkedin.com/in/elle-yu-658086214</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">🐙</span>
                                <span class="contact-text">Support my Startup: https://www.mentorall.io</span>
                            </div>
                        </div>
                        <div class="contact-message">
                            <p>Let me know if you are interested to colloborate with MentorAll</p>
                        </div>
                    </div>
                `
            }
        };
    }

    setupEventListeners() {
        document.querySelectorAll('.milestone').forEach(milestone => {
            milestone.addEventListener('click', () => {
                const milestoneNum = parseInt(milestone.dataset.milestone);
                this.handleMilestoneClick(milestoneNum);
            });
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextMilestone();
        });

        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });

        // Mascot click
        document.getElementById('mascot').addEventListener('click', () => {
            this.animateMascot();
        });
    }

    handleMilestoneClick(milestoneNum) {
        const milestone = document.getElementById(`milestone${milestoneNum}`);
        
        if (milestone.classList.contains('unlocked') && !milestone.classList.contains('completed')) {
            this.showMilestoneModal(milestoneNum);
        }
    }

    showMilestoneModal(milestoneNum) {
        const modal = document.getElementById('milestoneModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        const milestone = this.milestoneData[milestoneNum];
        modalTitle.textContent = milestone.title;
        modalBody.innerHTML = milestone.content;
        
        modal.classList.add('active');
        this.currentMilestone = milestoneNum;
    }

    closeModal() {
        document.getElementById('milestoneModal').classList.remove('active');
    }

    nextMilestone() {
        // Complete current milestone
        this.completeMilestone(this.currentMilestone);
        this.closeModal();
        
        // Unlock next milestone
        if (this.currentMilestone < this.totalMilestones) {
            this.unlockMilestone(this.currentMilestone + 1);
        } else {
            // All milestones completed!
            this.showCelebration();
        }
    }

    completeMilestone(milestoneNum) {
        const milestone = document.getElementById(`milestone${milestoneNum}`);
        milestone.classList.add('completed');
        milestone.classList.remove('unlocked');
        
        this.completedMilestones++;
        this.updateProgress();
        
        // Animate completion
        this.animateCompletion(milestone);
        
        // Move small mascot to next position
        this.moveSmallMascot();
    }

    unlockMilestone(milestoneNum) {
        const milestone = document.getElementById(`milestone${milestoneNum}`);
        milestone.classList.add('unlocked');
        
        // Animate unlock
        this.animateUnlock(milestone);
    }

    unlockFirstMilestone() {
        this.unlockMilestone(1);
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const progress = (this.completedMilestones / this.totalMilestones) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${this.completedMilestones}/${this.totalMilestones} Milestones Completed`;
        
        // Unlock ice cream goal when all milestones are completed
        if (this.completedMilestones === this.totalMilestones) {
            document.getElementById('iceCreamGoal').classList.add('unlocked');
        }
    }

    showCelebration() {
        const celebrationModal = document.getElementById('celebrationModal');
        celebrationModal.classList.add('active');
        
        // Animate ice cream goal
        document.getElementById('iceCreamGoal').classList.add('unlocked');
    }

    restartGame() {
        // Reset all milestones
        document.querySelectorAll('.milestone').forEach(milestone => {
            milestone.classList.remove('unlocked', 'completed');
        });
        
        // Reset progress
        this.completedMilestones = 0;
        this.currentMilestone = 0;
        this.updateProgress();
        
        // Close modals
        document.getElementById('milestoneModal').classList.remove('active');
        document.getElementById('celebrationModal').classList.remove('active');
        
        // Reset small mascot position
        this.positionSmallMascot();
        
        // Unlock first milestone
        this.unlockFirstMilestone();
    }

    animateCompletion(milestone) {
        milestone.style.animation = 'none';
        milestone.offsetHeight; // Trigger reflow
        milestone.style.animation = 'iconCelebration 0.6s ease-out';
    }

    animateUnlock(milestone) {
        milestone.style.animation = 'none';
        milestone.offsetHeight; // Trigger reflow
        milestone.style.animation = 'slideInFromLeft 0.6s ease-out';
    }

    animateMascot() {
        const mascot = document.getElementById('mascot');
        mascot.style.animation = 'none';
        mascot.offsetHeight; // Trigger reflow
        mascot.style.animation = 'mascotBounce 0.5s ease-out';
        
        // Show encouraging message
        this.showMascotMessage();
    }

    showMascotMessage() {
        const messages = [
            "This doesn't work",
            "It hurts, stop clicking!!!",
            "Try again, maybe it will work next time",
            "Do smth meaningful with your life",
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Create temporary message bubble
        const messageBubble = document.createElement('div');
        messageBubble.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 20px;
            background: #ffd700;
            color: black;
            padding: 1rem;
            border-radius: 20px;
            font-weight: 600;
            z-index: 1001;
            animation: messageSlideIn 0.3s ease-out;
            max-width: 200px;
            box-shadow: var(--shadow);
        `;
        messageBubble.textContent = randomMessage;
        
        document.body.appendChild(messageBubble);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageBubble.style.animation = 'messageSlideOut 0.3s ease-out';
            setTimeout(() => messageBubble.remove(), 300);
        }, 3000);
    }

    positionSmallMascot() {
        const smallMascot = document.getElementById('smallMascot');
        if (this.completedMilestones === 0) {
            // Start at first milestone
            smallMascot.style.top = '50px';
            smallMascot.style.left = '30px';
            smallMascot.classList.add('visible');
        } else {
            this.moveSmallMascot();
        }
    }

    moveSmallMascot() {
        const smallMascot = document.getElementById('smallMascot');
        const roadmapContainer = document.querySelector('.roadmap-container');
        const iceCreamGoal = document.getElementById('iceCreamGoal');
        
        // Calculate positions accounting for gaps (2rem = 32px) and milestone heights
        const milestoneHeight = 100; // Approximate height of each milestone
        const gap = 32; // 2rem gap between milestones
        const startOffset = 50; // Starting position
        
        const milestonePositions = [
            { top: startOffset + 'px', left: '30px' },                    // Milestone 1
            { top: (startOffset + milestoneHeight + gap) + 'px', left: '30px' },        // Milestone 2
            { top: (startOffset + (milestoneHeight + gap) * 2) + 'px', left: '30px' },  // Milestone 3
            { top: (startOffset + (milestoneHeight + gap) * 3) + 'px', left: '30px' },  // Milestone 4
            { top: (startOffset + (milestoneHeight + gap) * 4) + 'px', left: '30px' },  // Milestone 5
            { top: (startOffset + (milestoneHeight + gap) * 5) + 'px', left: '30px' },  // Milestone 6
        ];
        
        // If all milestones completed, move to ice cream
        if (this.completedMilestones >= this.totalMilestones) {
            // Get the actual position of the ice cream goal
            const iceCreamRect = iceCreamGoal.getBoundingClientRect();
            const roadmapRect = roadmapContainer.getBoundingClientRect();
            
            // Calculate relative position within the roadmap container
            const relativeTop = iceCreamRect.top - roadmapRect.top;
            const relativeLeft = 30; // Keep it aligned with the roadmap line
            
            smallMascot.style.top = relativeTop + 'px';
            smallMascot.style.left = relativeLeft + 'px';
            
            // Add celebration animation
            smallMascot.style.animation = 'smallMascotCelebration 1s ease-out';
            setTimeout(() => {
                smallMascot.style.animation = '';
            }, 1000);
        } else {
            // Move to next milestone position
            const nextPosition = milestonePositions[this.completedMilestones];
            smallMascot.style.top = nextPosition.top;
            smallMascot.style.left = nextPosition.left;
        }
        
        // Ensure mascot is visible
        smallMascot.classList.add('visible');
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes messageSlideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(20px); opacity: 0; }
    }
    
    .milestone-content {
        line-height: 1.6;
    }
    
    .intro-details, .dreams-list, .contact-info {
        margin-top: 1rem;
    }
    
    .detail-item, .dream-item, .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background: rgba(88, 204, 2, 0.1);
        border-radius: 8px;
    }
    
    .story-timeline {
        margin-top: 1rem;
    }
    
    .story-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background: rgba(28, 176, 246, 0.1);
        border-radius: 8px;
    }
    
    .story-year {
        font-weight: 600;
        color: var(--duolingo-blue);
        min-width: 80px;
    }
    
    .skills-grid, .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .skill-item, .project-item {
        text-align: center;
        padding: 1rem;
        background: rgba(255, 150, 0, 0.1);
        border-radius: 8px;
    }
    
    .skill-icon, .dream-emoji, .contact-icon, .detail-icon {
        font-size: 1.5rem;
    }
    
    .skill-name, .project-title {
        font-weight: 600;
        margin: 0.5rem 0;
    }
    
    .skill-level {
        font-size: 0.9rem;
        color: var(--duolingo-green);
        font-weight: 600;
    }
    
    .contact-message {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 8px;
        font-style: italic;
    }
    
    @keyframes smallMascotCelebration {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.2) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
`;
document.head.appendChild(style);

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DreamJourneyGame();
});