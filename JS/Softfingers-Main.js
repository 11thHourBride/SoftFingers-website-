document.addEventListener('DOMContentLoaded', () => {
  // ==== FIREBASE CONFIG ====
  const firebaseConfig = {
    apiKey: "AIzaSyCoQO4vR_lIStx2lMPSy_YhHYPh75gHRSQ",
    authDomain: "softfingers-typing.firebaseapp.com",
    projectId: "softfingers-typing",
    storageBucket: "softfingers-typing.firebasestorage.app",
    messagingSenderId: "896354348357",
    appId: "1:896354348357:web:72fda3e79dce5f5b8b622c",
    measurementId: "G-SLF302PVR4"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // ==== AUTH MODAL HANDLERS (Setup immediately) ====
  const authModalOverlay = document.getElementById('auth-modal-overlay');
  const closeAuthModalBtn = document.getElementById('close-auth-modal');
  
  // Close button handler
  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', () => {
      if (authModalOverlay) {
        authModalOverlay.classList.remove('show');
      }
    });
  }
  
  // Click outside to close
  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('show');
      }
    });
  }
  
  // Function to show auth modal
  window.showAuthModal = function() {
    if (authModalOverlay) {
      authModalOverlay.classList.add('show');
      console.log('Auth modal should be visible now');
    } else {
      console.error('Auth modal overlay not found!');
    }
  };
  

  // Check for competition code in URL
  const urlParams = new URLSearchParams(window.location.search);
  const compCode = urlParams.get('comp');

// ==== F5 KEY HANDLER ====
let f5PressCount = 0;
let f5Timer = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'F5') {
    e.preventDefault();
    f5PressCount++;
    
    if (f5PressCount === 1) {
      // First press - generate new test based on current mode
      if (mode === 'quote') {
        loadNewQuote();
      } else if (mode === 'story') {
        loadNewStory();
      } else {
        loadNewPassage();
      }
      
      // Add autofocus after loading new test
      focusTypingInput();
      
      // Reset counter after 1 second
      f5Timer = setTimeout(() => {
        f5PressCount = 0;
      }, 1000);
    } else if (f5PressCount === 2) {
      // Second press within 1 second - refresh page
      clearTimeout(f5Timer);
      location.reload();
    }
  }
});
// ==== COMPETITION MODALS ====
  const createCompModal = document.getElementById('create-competition-modal');
  const joinCompModal = document.getElementById('join-competition-modal');
  const detailsCompModal = document.getElementById('competition-details-modal');
  
  const createCompBtn = document.getElementById('create-competition-btn');
  const joinCompBtn = document.getElementById('join-competition-btn');
  
  const closeCreateModal = document.getElementById('close-create-modal');
  const closeJoinModal = document.getElementById('close-join-modal');
  const closeDetailsModal = document.getElementById('close-details-modal');
  
  const cancelCreateComp = document.getElementById('cancel-create-comp');
  const cancelJoinComp = document.getElementById('cancel-join-comp');
  
  // Open modals
  if (createCompBtn) {
    createCompBtn.addEventListener('click', () => {
      if (!currentUser) {
        alert('Please sign in to create a competition');
        return;
      }
      createCompModal.classList.remove('hidden');
    });
  }
  
  if (joinCompBtn) {
    joinCompBtn.addEventListener('click', () => {
      if (!currentUser) {
        alert('Please sign in to join a competition');
        return;
      }
      joinCompModal.classList.remove('hidden');
    });
  }
  
  // Close modals
  [closeCreateModal, cancelCreateComp].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        createCompModal.classList.add('hidden');
      });
    }
  });
  
  [closeJoinModal, cancelJoinComp].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        joinCompModal.classList.add('hidden');
      });
    }
  });
  
  if (closeDetailsModal) {
    closeDetailsModal.addEventListener('click', () => {
      detailsCompModal.classList.add('hidden');
    });
  }
  
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      this.parentElement.classList.add('hidden');
    });
  });
  // ==== CREATE COMPETITION ====
  const createCompForm = document.getElementById('create-competition-form');
  
  if (createCompForm) {
    createCompForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!currentUser) {
        alert('Please sign in to create a competition');
        return;
      }
      
      const submitBtn = createCompForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating...';
      
      try {
        const code = generateCompetitionCode();
        const now = new Date();
        const daysToAdd = parseInt(document.getElementById('comp-days').value);
        const endDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
        
        const competition = {
          code: code,
          name: document.getElementById('comp-name').value,
          targetWPM: parseInt(document.getElementById('comp-target-wpm').value),
          maxParticipants: parseInt(document.getElementById('comp-max-participants').value),
          duration: parseInt(document.getElementById('comp-duration').value),
          difficulty: document.getElementById('comp-difficulty').value,
          mode: document.getElementById('comp-mode').value,
          description: document.getElementById('comp-description').value,
          creatorId: currentUser.uid,
          creatorEmail: currentUser.email,
          participantIds: [currentUser.uid],  // CHANGED: Array of UIDs only
          participants: [{
            uid: currentUser.uid,
            email: currentUser.email,
            joinedAt: firebase.firestore.Timestamp.now()
          }],
          leaderboard: [],
          status: 'active',
          createdAt: firebase.firestore.Timestamp.now(),
          endsAt: firebase.firestore.Timestamp.fromDate(endDate),
          winner: null
        };
        
        await db.collection('competitions').add(competition);
        
        createCompModal.classList.add('hidden');
        createCompForm.reset();
        
        // Show share modal
        showCompetitionShareModal(competition);
        
        // Reload competitions
        await loadCompetitions();
        
      } catch (error) {
        console.error('Error creating competition:', error);
        alert('Failed to create competition. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Competition';
      }
    });
  }
 function showCompetitionShareModal(competition) {
    const shareURL = getCompetitionShareURL(competition.code);
    const shareText = `Join my typing competition "${competition.name}"! Target: ${competition.targetWPM} WPM. Use code: ${competition.code}`;
    
    const content = `
      <div class="share-section">
        <h4 class="share-title">Competition Created! 🎉</h4>
        <p class="text-muted" style="margin-bottom: 16px;">Share this code with your friends to invite them:</p>
        
        <div class="share-code-display">
          <div class="share-code" id="comp-code-display">${competition.code}</div>
          <button class="copy-code-btn" id="copy-comp-code">Copy</button>
        </div>
        
        <h5 class="share-title" style="margin-top: 20px;">Share via:</h5>
        <div class="share-buttons">
          <button class="share-btn whatsapp" data-share="whatsapp">
            📱 WhatsApp
          </button>
          <button class="share-btn facebook" data-share="facebook">
            👥 Facebook
          </button>
          <button class="share-btn twitter" data-share="twitter">
            🐦 Twitter
          </button>
          <button class="share-btn telegram" data-share="telegram">
            ✈️ Telegram
          </button>
          <button class="share-btn copy-link" data-share="copylink">
            🔗 Copy Link
          </button>
          <button class="share-btn copy-link" data-share="email">
            📧 Email
          </button>
        </div>
      </div>
      
      <div class="competition-info-grid" style="margin-top: 24px;">
        <div class="competition-info-item">
          <div class="competition-info-label">Target WPM</div>
          <div class="competition-info-value">${competition.targetWPM}</div>
        </div>
        <div class="competition-info-item">
          <div class="competition-info-label">Duration</div>
          <div class="competition-info-value">${competition.duration}s</div>
        </div>
        <div class="competition-info-item">
          <div class="competition-info-label">Max Players</div>
          <div class="competition-info-value">${competition.maxParticipants}</div>
        </div>
        <div class="competition-info-item">
          <div class="competition-info-label">Ends In</div>
          <div class="competition-info-value">${formatTimeRemaining(competition.endsAt)}</div>
        </div>
      </div>
    `;
    
    document.getElementById('detail-comp-name').textContent = competition.name;
    document.getElementById('competition-details-content').innerHTML = content;
    detailsCompModal.classList.remove('hidden');
    
    // Add event listeners for share buttons
    setTimeout(() => {
      document.getElementById('copy-comp-code')?.addEventListener('click', () => {
        copyToClipboard(competition.code);
      });
      
      document.querySelectorAll('[data-share]').forEach(btn => {
        btn.addEventListener('click', function() {
          const shareType = this.dataset.share;
          handleShare(shareType, shareText, shareURL, competition.name);
        });
      });
    }, 100);
  }
  
  // Unified share handler
  function handleShare(type, text, url, title) {
    switch(type) {
      case 'whatsapp':
        shareViaWhatsApp(text, url);
        break;
      case 'facebook':
        shareViaFacebook(url);
        break;
      case 'twitter':
        shareViaTwitter(text, url);
        break;
      case 'telegram':
        shareViaTelegram(text, url);
        break;
      case 'copylink':
        copyToClipboard(url);
        break;
      case 'email':
        shareViaEmail(title || 'Join My Typing Competition', text + '\n\n' + url);
        break;
    }
  }
  
  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
  }
  
  window.shareViaWhatsApp = function(text, url) {
    // WhatsApp sharing
    const message = encodeURIComponent(`${text}\n\n${url}`);
    
    // Detect if mobile or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappURL;
    if (isMobile) {
      // Mobile: use whatsapp:// protocol
      whatsappURL = `whatsapp://send?text=${message}`;
    } else {
      // Desktop: use web.whatsapp.com
      whatsappURL = `https://web.whatsapp.com/send?text=${message}`;
    }
    
    window.open(whatsappURL, '_blank');
  };
  
  window.shareViaFacebook = function(url) {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookURL, '_blank', 'width=600,height=400');
  };
  
  window.shareViaTwitter = function(text, url) {
    // Twitter has character limits, so keep text concise
    const tweetText = encodeURIComponent(text);
    const tweetURL = encodeURIComponent(url);
    const twitterURL = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetURL}`;
    
    window.open(twitterURL, '_blank', 'width=600,height=400');
  };
  
  window.shareViaTelegram = function(text, url) {
    const message = encodeURIComponent(`${text}\n${url}`);
    const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    
    window.open(telegramURL, '_blank', 'width=600,height=400');
  };
  
  window.shareViaEmail = function(subject, body) {
    const mailtoURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
  };
  // Web Share API (works on mobile and some desktop browsers)
  window.shareCompetitionNative = function(title, text, url) {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: show share modal with all options
      console.log('Web Share API not supported');
    }
  };

  // ==== JOIN COMPETITION ====
  const joinCompForm = document.getElementById('join-competition-form');
  
  if (joinCompForm) {
    joinCompForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!currentUser) {
        alert('Please sign in to join a competition');
        return;
      }
      
      const submitBtn = joinCompForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Joining...';
      
      try {
        const code = document.getElementById('join-code').value.toUpperCase().trim();
        
        // Find competition by code
        const compSnap = await db.collection('competitions')
          .where('code', '==', code)
          .limit(1)
          .get();
        
        if (compSnap.empty) {
          alert('Competition not found. Please check the code.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join Competition';
          return;
        }
        
        const compDoc = compSnap.docs[0];
        const competition = compDoc.data();
        
        // Check if competition is still active
        if (competition.status !== 'active') {
          alert('This competition has ended.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join Competition';
          return;
        }
        
        // Check if user already joined
        const alreadyJoined = competition.participantIds.includes(currentUser.uid);  // CHANGED
        if (alreadyJoined) {
          alert('You have already joined this competition!');
          joinCompModal.classList.add('hidden');
          joinCompForm.reset();
          await loadCompetitions();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join Competition';
          return;
        }
        
        // Check if competition is full
        if (competition.participants.length >= competition.maxParticipants) {
          alert('This competition is full.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join Competition';
          return;
        }
        
        // Add user to participants
        await compDoc.ref.update({
          participantIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),  // CHANGED
          participants: firebase.firestore.FieldValue.arrayUnion({
            uid: currentUser.uid,
            email: currentUser.email,
            joinedAt: firebase.firestore.Timestamp.now()
          })
        });
        
        alert('Successfully joined the competition!');
        joinCompModal.classList.add('hidden');
        joinCompForm.reset();
        
        // Reload competitions
        await loadCompetitions();
        
      } catch (error) {
        console.error('Error joining competition:', error);
        alert('Failed to join competition. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join Competition';
      }
    });
  }
// ==== LOAD COMPETITIONS ====
  async function loadCompetitions() {
    if (!currentUser) return;
    
    console.log('Loading competitions for user:', currentUser.uid);
    
    try {
      // Load user's competitions (created or joined)
      const myCompsSnap = await db.collection('competitions')
        .where('participantIds', 'array-contains', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get();
      
      console.log('Found my competitions:', myCompsSnap.size);
      
      // Load ALL active competitions for discovery
      const allActiveSnap = await db.collection('competitions')
        .where('status', '==', 'active')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      
      console.log('Found all active competitions:', allActiveSnap.size);
      
      const myCompsList = document.getElementById('my-competitions-list');
      const activeCompsList = document.getElementById('active-competitions-list');
      const completedCompsList = document.getElementById('completed-competitions-list');
      
      const now = new Date();
      let myCompsHTML = '';
      let myActiveCompsHTML = '';
      let completedCompsHTML = '';
      
      // Process user's competitions
      if (myCompsSnap.empty) {
        myCompsList.innerHTML = '<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 40px;">You haven\'t created or joined any competitions yet.</p>';
      } else {
        for (const doc of myCompsSnap.docs) {
          const comp = doc.data();
          const compId = doc.id;
          
          // Ensure participantIds exists (migration for old competitions)
          if (!comp.participantIds) {
            const participantIds = comp.participants ? comp.participants.map(p => p.uid) : [comp.creatorId];
            await doc.ref.update({ participantIds: participantIds });
            comp.participantIds = participantIds;
          }
          
          const endDate = comp.endsAt.toDate();
          const isActive = endDate > now && comp.status === 'active';
          const isCreator = comp.creatorId === currentUser.uid;
          const isParticipant = true; // They're in this list because they're a participant
          
          // Update status if needed
          if (!isActive && comp.status === 'active') {
            await doc.ref.update({ status: 'completed' });
            comp.status = 'completed';
          }
          
          const card = createCompetitionCard(comp, compId, isCreator, isParticipant);
          
          myCompsHTML += card;
          
          if (isActive) {
            myActiveCompsHTML += card;
          } else {
            completedCompsHTML += card;
          }
        }
        
        myCompsList.innerHTML = myCompsHTML;
      }
      
      // Process ALL active competitions for discovery
      let allActiveCompsHTML = '';
      const userCompIds = new Set();
      myCompsSnap.forEach(doc => userCompIds.add(doc.id));
      
      for (const doc of allActiveSnap.docs) {
        const comp = doc.data();
        const compId = doc.id;
        
        // Ensure participantIds exists (migration for old competitions)
        if (!comp.participantIds) {
          const participantIds = comp.participants ? comp.participants.map(p => p.uid) : [comp.creatorId];
          await doc.ref.update({ participantIds: participantIds });
          comp.participantIds = participantIds;
        }
        
        const endDate = comp.endsAt.toDate();
        const isActive = endDate > now;
        const isCreator = comp.creatorId === currentUser.uid;
        const isParticipant = comp.participantIds && comp.participantIds.includes(currentUser.uid);
        
        if (isActive) {
          // Update status if needed
          if (comp.status !== 'active') {
            await doc.ref.update({ status: 'active' });
            comp.status = 'active';
          }
          
          const card = createCompetitionCard(comp, compId, isCreator, isParticipant);
          allActiveCompsHTML += card;
        } else {
          // Competition has ended
          if (comp.status === 'active') {
            await doc.ref.update({ status: 'completed' });
          }
        }
      }
      
      activeCompsList.innerHTML = allActiveCompsHTML || '<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 40px;">No active competitions available.</p>';
      completedCompsList.innerHTML = completedCompsHTML || '<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 40px;">No completed competitions.</p>';
      
    } catch (error) {
      console.error('Error loading competitions:', error);
      const myCompsList = document.getElementById('my-competitions-list');
      if (myCompsList) {
        myCompsList.innerHTML = `<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 40px;">Error loading competitions: ${error.message}</p>`;
      }
    }
  }

 function createCompetitionCard(comp, compId, isCreator, isParticipant) {
    const now = new Date();
    const endDate = comp.endsAt.toDate();
    const isActive = endDate > now && comp.status === 'active';
    const timeRemaining = formatTimeRemaining(comp.endsAt);
    
    // Safety checks for participants
    const participants = comp.participants || [];
    const participantCount = participants.length;
    const maxParticipants = comp.maxParticipants || 10;
    const spotsLeft = maxParticipants - participantCount;
    const isFull = participantCount >= maxParticipants;
    
    // Generate participant avatars
    let avatarsHTML = '';
    participants.slice(0, 5).forEach(participant => {
      const initial = participant.email ? participant.email.charAt(0).toUpperCase() : '?';
      avatarsHTML += `<div class="participant-avatar">${initial}</div>`;
    });
    if (participantCount > 5) {
      avatarsHTML += `<div class="participant-avatar">+${participantCount - 5}</div>`;
    }
    
    // Get top 3 from leaderboard
    const leaderboard = comp.leaderboard || [];
    const sortedLeaderboard = leaderboard.sort((a, b) => b.wpm - a.wpm).slice(0, 3);
    
    // Determine action buttons based on participation status
    let actionButtonsHTML = '';
    
    if (isParticipant) {
      // User is already a participant
      if (isActive) {
        actionButtonsHTML = `
          <button class="btn" onclick="startCompetitionTest('${compId}', '${comp.difficulty}', ${comp.duration}, '${comp.mode}')">
            Start Test
          </button>
          <button class="btn-secondary" onclick="viewCompetitionDetails('${compId}')">
            View Details
          </button>
        `;
      } else {
        actionButtonsHTML = `
          <button class="btn-secondary" onclick="viewCompetitionDetails('${compId}')">
            View Results
          </button>
        `;
      }
      
      if (isCreator) {
        actionButtonsHTML += `
          <button class="btn-secondary" onclick="shareCompetition('${comp.code}', '${comp.name.replace(/'/g, "\\'")}', ${comp.targetWPM})">
            Share
          </button>
        `;
      }
    } else {
      // User is NOT a participant - show join button
      if (isActive && !isFull) {
        actionButtonsHTML = `
          <button class="btn" onclick="quickJoinCompetition('${compId}')">
            🎯 Join Competition
          </button>
          <button class="btn-secondary" onclick="viewCompetitionDetails('${compId}')">
            View Details
          </button>
        `;
      } else if (isFull) {
        actionButtonsHTML = `
          <button class="btn" disabled style="opacity: 0.5; cursor: not-allowed;">
            Competition Full
          </button>
          <button class="btn-secondary" onclick="viewCompetitionDetails('${compId}')">
            View Details
          </button>
        `;
      } else {
        actionButtonsHTML = `
          <button class="btn-secondary" onclick="viewCompetitionDetails('${compId}')">
            View Details
          </button>
        `;
      }
    }
    
    const compName = comp.name || 'Untitled Competition';
    const compDescription = comp.description || '';
    const compTargetWPM = comp.targetWPM || 60;
    const compDuration = comp.duration || 60;
    const compDifficulty = comp.difficulty || 'Intermediate';
    const compMode = comp.mode || 'passage';
    
    return `
      <div class="competition-card ${isActive ? 'active' : 'completed'}">
        <div class="competition-status ${isActive ? 'active' : 'completed'}">
          ${isActive ? 'Active' : 'Completed'}
        </div>
        
        ${!isParticipant && isActive ? `
          <div style="position: absolute; top: 12px; left: 12px; background: rgba(81, 207, 102, 0.2); color: #51cf66; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
            JOIN NOW
          </div>
        ` : ''}
        
        <div class="competition-card-header">
          <h4 class="competition-card-title">${compName}</h4>
          <div class="competition-card-meta">
            <span>⏱️ ${timeRemaining}</span>
            <span>🎯 ${compTargetWPM} WPM</span>
            <span>👥 ${participantCount}/${maxParticipants}</span>
          </div>
        </div>
        
        <div class="competition-card-body">
          ${compDescription ? `<p class="text-small text-muted" style="margin-bottom: 12px;">${compDescription}</p>` : ''}
          
          <div class="competition-info-grid">
            <div class="competition-info-item">
              <div class="competition-info-label">Duration</div>
              <div class="competition-info-value">${compDuration}s</div>
            </div>
            <div class="competition-info-item">
              <div class="competition-info-label">Difficulty</div>
              <div class="competition-info-value">${compDifficulty}</div>
            </div>
            <div class="competition-info-item">
              <div class="competition-info-label">Mode</div>
              <div class="competition-info-value">${compMode}</div>
            </div>
            <div class="competition-info-item">
              <div class="competition-info-label">Spots Left</div>
              <div class="competition-info-value ${spotsLeft === 0 ? 'incorrect' : spotsLeft <= 3 ? '' : 'correct'}">${spotsLeft}</div>
            </div>
          </div>
          
          ${sortedLeaderboard.length > 0 ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
              <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
                🏆 Top Performers
              </div>
              ${sortedLeaderboard.map((entry, index) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                  <span style="font-size: 0.875rem;">
                    <span style="color: ${index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}; font-weight: 700; margin-right: 8px;">
                      ${index + 1}.
                    </span>
                    ${entry.email ? entry.email.split('@')[0] : 'Anonymous'}
                  </span>
                  <span style="font-weight: 600; color: var(--accent-solid);">${entry.wpm || 0} WPM</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div class="competition-participants">
            <div class="competition-participants-header">
              <span class="competition-participants-title">Participants</span>
              <span class="competition-participants-count">${participantCount}/${maxParticipants}</span>
            </div>
            <div class="participants-avatars">
              ${avatarsHTML || '<div class="participant-avatar">?</div>'}
            </div>
          </div>
        </div>
        
        <div class="competition-card-footer">
          ${actionButtonsHTML}
        </div>
      </div>
    `;
  }

 // Quick join competition from card
  window.quickJoinCompetition = async function(compId) {
    if (!currentUser) {
      alert('Please sign in to join competitions');
      return;
    }
    
    if (!confirm('Do you want to join this competition?')) {
      return;
    }
    
    try {
      const compDoc = await db.collection('competitions').doc(compId).get();
      
      if (!compDoc.exists) {
        alert('Competition not found');
        return;
      }
      
      const competition = compDoc.data();
      
      // Ensure participantIds exists
      if (!competition.participantIds) {
        const participantIds = competition.participants ? competition.participants.map(p => p.uid) : [competition.creatorId];
        await compDoc.ref.update({ participantIds: participantIds });
        competition.participantIds = participantIds;
      }
      
      // Check if competition is still active
      if (competition.status !== 'active') {
        alert('This competition has ended.');
        return;
      }
      
      // Check if user already joined
      const alreadyJoined = competition.participantIds.includes(currentUser.uid);
      if (alreadyJoined) {
        alert('You have already joined this competition!');
        await loadCompetitions();
        return;
      }
      
      // Check if competition is full
      const participants = competition.participants || [];
      const maxParticipants = competition.maxParticipants || 10;
      if (participants.length >= maxParticipants) {
        alert('This competition is full.');
        await loadCompetitions();
        return;
      }
      
      // Add user to participants
      await compDoc.ref.update({
        participantIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        participants: firebase.firestore.FieldValue.arrayUnion({
          uid: currentUser.uid,
          email: currentUser.email,
          joinedAt: firebase.firestore.Timestamp.now()
        })
      });
      
      alert('Successfully joined the competition! 🎉');
      
      // Reload competitions
      await loadCompetitions();
      
    } catch (error) {
      console.error('Error joining competition:', error);
      alert('Failed to join competition. Please try again.');
    }
  };

// Global competition functions
  window.startCompetitionTest = function(compId, difficulty, duration, mode) {
    // Store competition info - this will persist across multiple tests
    localStorage.setItem('activeCompetition', compId);
    localStorage.setItem('competitionMode', 'active'); // Flag that we're in competition mode
    
    // Switch to dashboard
    document.querySelector('[data-feature="dashboard"]').click();
    
    // Set test parameters
    currentDifficulty = difficulty;
    document.querySelector(`[data-diff="${difficulty}"]`)?.click();
    
    durationSelect.value = duration;
    modeSelect.value = mode;
    
    // Trigger mode change
    const event = new Event('change');
    durationSelect.dispatchEvent(event);
    modeSelect.dispatchEvent(event);
    
    // Load new test
    if (mode === 'quote') loadNewQuote();
    else if (mode === 'story') loadNewStory();
    else loadNewPassage();
    
    // Focus input
    focusTypingInput();
    
    // Show competition indicator
    showCompetitionIndicator(compId);
    
    alert('Competition mode activated! All tests will count until you leave the dashboard.');
  };
  
  // Show competition indicator
  function showCompetitionIndicator(compId) {
    // Remove existing indicator if any
    const existing = document.getElementById('competition-indicator');
    if (existing) existing.remove();
    
    // Create indicator
    const indicator = document.createElement('div');
    indicator.id = 'competition-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 80px;
      right: 24px;
      background: linear-gradient(135deg, #51cf66, #37b24d);
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      z-index: 9999;
      box-shadow: 0 4px 16px rgba(81, 207, 102, 0.4);
      font-weight: 600;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease;
    `;
    indicator.innerHTML = `
      <span>🏆</span>
      <span>Competition Mode Active</span>
      <button onclick="exitCompetitionMode()" style="
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 4px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 8px;
      ">Exit</button>
    `;
    
    document.body.appendChild(indicator);
  }
  
  // Exit competition mode
  window.exitCompetitionMode = function() {
    if (confirm('Are you sure you want to exit competition mode? Future tests won\'t count towards the competition.')) {
      localStorage.removeItem('activeCompetition');
      localStorage.removeItem('competitionMode');
      
      const indicator = document.getElementById('competition-indicator');
      if (indicator) indicator.remove();
      
      alert('Competition mode deactivated.');
    }
  };
window.viewCompetitionDetails = async function(compId) {
    try {
      const doc = await db.collection('competitions').doc(compId).get();
      if (!doc.exists) {
        alert('Competition not found');
        return;
      }
      
      const comp = doc.data();
      const isCreator = comp.creatorId === currentUser.uid;
      const shareURL = getCompetitionShareURL(comp.code);
      const shareText = `Join my typing competition "${comp.name}"! Target: ${comp.targetWPM} WPM. Use code: ${comp.code}`;
      
      // Sort leaderboard
      const sortedLeaderboard = (comp.leaderboard || []).sort((a, b) => b.wpm - a.wpm);
      
      let leaderboardHTML = '';
      if (sortedLeaderboard.length > 0) {
        leaderboardHTML = `
          <div class="competition-leaderboard">
            <h4 class="leaderboard-title">Leaderboard</h4>
            <div class="leaderboard-list">
              ${sortedLeaderboard.map((entry, index) => `
                <div class="leaderboard-item ${index === 0 ? 'winner' : ''}">
                  <div class="leaderboard-rank ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}">
                    #${index + 1}
                  </div>
                  <div class="leaderboard-user">
                    ${entry.email || 'Anonymous'}
                  </div>
                  <div class="leaderboard-stats">
                    <div class="leaderboard-stat">
                      <div class="leaderboard-stat-label">WPM</div>
                      <div class="leaderboard-stat-value">${entry.wpm || 0}</div>
                    </div>
                    <div class="leaderboard-stat">
                      <div class="leaderboard-stat-label">Accuracy</div>
                      <div class="leaderboard-stat-value">${entry.accuracy || 0}%</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      
      const content = `
        <div class="competition-info-grid">
          <div class="competition-info-item">
            <div class="competition-info-label">Target WPM</div>
            <div class="competition-info-value">${comp.targetWPM}</div>
          </div>
          <div class="competition-info-item">
            <div class="competition-info-label">Duration</div>
            <div class="competition-info-value">${comp.duration}s</div>
          </div>
          <div class="competition-info-item">
            <div class="competition-info-label">Difficulty</div>
            <div class="competition-info-value">${comp.difficulty}</div>
          </div>
          <div class="competition-info-item">
            <div class="competition-info-label">Mode</div>
            <div class="competition-info-value">${comp.mode}</div>
          </div>
          <div class="competition-info-item">
            <div class="competition-info-label">Participants</div>
            <div class="competition-info-value">${comp.participants.length}/${comp.maxParticipants}</div>
          </div>
          <div class="competition-info-item">
            <div class="competition-info-label">Time Left</div>
            <div class="competition-info-value">${formatTimeRemaining(comp.endsAt)}</div>
          </div>
        </div>
        
        ${comp.description ? `
          <div style="margin-top: 20px; padding: 16px; background: var(--card-secondary); border-radius: 8px;">
            <h4 style="margin: 0 0 8px; font-size: 0.875rem; color: var(--text-secondary);">Description</h4>
            <p style="margin: 0; color: var(--text);">${comp.description}</p>
          </div>
        ` : ''}
        
        ${leaderboardHTML}
        
        ${isCreator ? `
          <div class="share-section">
            <h4 class="share-title">Share Competition</h4>
            <div class="share-code-display">
              <div class="share-code" id="detail-comp-code">${comp.code}</div>
              <button class="copy-code-btn" id="copy-detail-code">Copy Code</button>
            </div>
            <div class="share-buttons" id="detail-share-buttons">
              <button class="share-btn whatsapp" data-share="whatsapp">
                📱 WhatsApp
              </button>
              <button class="share-btn facebook" data-share="facebook">
                👥 Facebook
              </button>
              <button class="share-btn twitter" data-share="twitter">
                🐦 Twitter
              </button>
              <button class="share-btn telegram" data-share="telegram">
                ✈️ Telegram
              </button>
              <button class="share-btn copy-link" data-share="copylink">
                🔗 Copy Link
              </button>
            </div>
          </div>
        ` : ''}
      `;
      
      document.getElementById('detail-comp-name').textContent = comp.name;
      document.getElementById('competition-details-content').innerHTML = content;
      detailsCompModal.classList.remove('hidden');
      
      // Add event listeners
      setTimeout(() => {
        document.getElementById('copy-detail-code')?.addEventListener('click', () => {
          copyToClipboard(comp.code);
        });
        
        document.querySelectorAll('#detail-share-buttons [data-share]').forEach(btn => {
          btn.addEventListener('click', function() {
            const shareType = this.dataset.share;
            handleShare(shareType, shareText, shareURL, comp.name);
          });
        });
      }, 100);
      
    } catch (error) {
      console.error('Error loading competition details:', error);
      alert('Failed to load competition details');
    }
  };
  
 window.shareCompetition = function(code, name, targetWPM) {
    const shareURL = getCompetitionShareURL(code);
    const shareText = `Join my typing competition "${name}"! Target: ${targetWPM} WPM. Use code: ${code}`;
    
    const content = `
      <div class="share-section">
        <h4 class="share-title">Share Competition</h4>
        <div class="share-code-display">
          <div class="share-code" id="share-comp-code">${code}</div>
          <button class="copy-code-btn" id="copy-share-code">Copy Code</button>
        </div>
        <div class="share-buttons" id="share-modal-buttons">
          <button class="share-btn whatsapp" data-share="whatsapp">
            📱 WhatsApp
          </button>
          <button class="share-btn facebook" data-share="facebook">
            👥 Facebook
          </button>
          <button class="share-btn twitter" data-share="twitter">
            🐦 Twitter
          </button>
          <button class="share-btn telegram" data-share="telegram">
            ✈️ Telegram
          </button>
          <button class="share-btn copy-link" data-share="copylink">
            🔗 Copy Link
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('detail-comp-name').textContent = name;
    document.getElementById('competition-details-content').innerHTML = content;
    detailsCompModal.classList.remove('hidden');
    
    // Add event listeners
    setTimeout(() => {
      document.getElementById('copy-share-code')?.addEventListener('click', () => {
        copyToClipboard(code);
      });
      
      document.querySelectorAll('#share-modal-buttons [data-share]').forEach(btn => {
        btn.addEventListener('click', function() {
          const shareType = this.dataset.share;
          handleShare(shareType, shareText, shareURL, name);
        });
      });
    }, 100);
  };
  // ==== LOAD LESSONS PAGE ====
 function loadLessonsPage() {
    if (!currentUser) return;
    
    // Update progress summary
    let totalCompleted = 0;
    let totalLessons = 0;
    let totalWPM = 0;
    let wpmCount = 0;
    
    Object.keys(LESSON_DATA).forEach(category => {
      const lessons = LESSON_DATA[category].lessons;
      totalLessons += lessons.length;
      
      lessons.forEach(lesson => {
        const progress = getLessonProgress(lesson.id);
        if (progress && progress.completed) {
          totalCompleted++;
          if (progress.bestWPM) {
            totalWPM += progress.bestWPM;
            wpmCount++;
          }
        }
      });
    });
    
    document.getElementById('total-lessons-completed').textContent = `${totalCompleted}/${totalLessons}`;
    document.getElementById('overall-progress').textContent = `${Math.round((totalCompleted / totalLessons) * 100)}%`;
    document.getElementById('current-wpm-avg').textContent = wpmCount > 0 ? Math.round(totalWPM / wpmCount) : 0;
    
    // Check if advanced is completed and show certificate button
    if (checkAdvancedCompletion()) {
      const headerActions = document.querySelector('.lessons-header > div:last-child');
      if (headerActions && !document.getElementById('view-certificate-btn')) {
        const certBtn = document.createElement('div');
        certBtn.innerHTML = `
          <button class="btn" id="view-certificate-btn" style="margin-top: 12px;">
            🏆 View My Certificate
          </button>
        `;
        headerActions.appendChild(certBtn);
        
        document.getElementById('view-certificate-btn').addEventListener('click', () => {
          // Recalculate stats and show certificate
          const lessons = LESSON_DATA.advanced.lessons;
          let totalWPM = 0;
          let maxWPM = 0;
          let totalAccuracy = 0;
          let count = 0;
          
          lessons.forEach(lesson => {
            const progress = getLessonProgress(lesson.id);
            if (progress) {
              if (progress.bestWPM) {
                totalWPM += progress.bestWPM;
                if (progress.bestWPM > maxWPM) maxWPM = progress.bestWPM;
              }
              if (progress.bestAccuracy) {
                totalAccuracy += progress.bestAccuracy;
              }
              count++;
            }
          });
          
          const stats = {
            avgWPM: count > 0 ? Math.round(totalWPM / count) : 0,
            maxWPM: maxWPM,
            avgAccuracy: count > 0 ? Math.round(totalAccuracy / count) : 0
          };
          
          const userName = currentUser.email.split('@')[0];
          const completionDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          generateCertificate(userName, completionDate, stats);
        });
      }
    }
    
    // Update category progress bars
    Object.keys(LESSON_DATA).forEach(category => {
      const progress = getCategoryProgress(category);
      const progressBar = document.getElementById(`${category}-progress`);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    });
    
    // Update category unlock states
    document.querySelectorAll('.lesson-category-card').forEach(card => {
      const category = card.dataset.category;
      const isUnlocked = isCategoryUnlocked(category);
      
      if (isUnlocked) {
        card.classList.remove('locked');
      } else {
        card.classList.add('locked');
      }
    });
    
    // Load beginner lessons by default
    loadCategoryLessons('beginner');
  }
  
  // Handle category card clicks
  document.querySelectorAll('.lesson-category-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      
      if (this.classList.contains('locked')) {
        alert('Complete the previous category to unlock this one!');
        return;
      }
      
      // Update active state
      document.querySelectorAll('.lesson-category-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Load lessons for this category
      loadCategoryLessons(category);
    });
  });
  function loadCategoryLessons(category) {
    const categoryData = LESSON_DATA[category];
    if (!categoryData) return;
    
    const container = document.getElementById('lessons-list-container');
    
    let html = `
      <div class="lessons-list-header">
        <h3 class="lessons-list-title">${categoryData.icon} ${categoryData.name}</h3>
        <p class="lessons-list-description">${categoryData.description}</p>
      </div>
      <div class="lessons-grid">
    `;
    
    categoryData.lessons.forEach((lesson, index) => {
      const progress = getLessonProgress(lesson.id);
      const isUnlocked = isLessonUnlocked(category, index);
      const isCompleted = progress && progress.completed;
      
      const exercisesCompleted = progress ? progress.exercisesCompleted || 0 : 0;
      const totalExercises = lesson.exercises || 1;
      const progressPercent = (exercisesCompleted / totalExercises) * 100;
      
      const bestWPM = progress && progress.bestWPM ? progress.bestWPM : 0;
      const bestAccuracy = progress && progress.bestAccuracy ? progress.bestAccuracy : 0;
      
      html += `
        <div class="lesson-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}" 
             onclick="${isUnlocked ? `startLesson('${category}', ${index})` : ''}">
          <div class="lesson-card-header">
            <span class="lesson-number">Lesson ${lesson.number}</span>
            <span class="lesson-status">
              ${isCompleted ? '✅' : !isUnlocked ? '🔒' : lesson.type === 'tutorial' ? '📚' : '📝'}
            </span>
          </div>
          <h4 class="lesson-card-title">${lesson.title}</h4>
          <p class="lesson-card-description">${lesson.description}</p>
          
          <div class="lesson-card-meta">
            ${lesson.type === 'tutorial' ? 
              '<span>📚 Tutorial</span>' : 
              `<span>🎯 ${lesson.targetWPM} WPM</span><span>🎪 ${lesson.targetAccuracy}%</span>`
            }
            <span>📊 ${totalExercises} ${totalExercises === 1 ? 'exercise' : 'exercises'}</span>
          </div>
          
          <div class="lesson-card-progress">
            <div class="lesson-card-progress-bar" style="width: ${progressPercent}%"></div>
          </div>
          
          <div class="lesson-card-footer">
            <div class="lesson-best-score">
              ${isCompleted ? `Best: ${bestWPM} WPM • ${bestAccuracy}%` : 
                isUnlocked ? `Progress: ${exercisesCompleted}/${totalExercises}` : 
                'Locked'}
            </div>
            ${isUnlocked ? `
              <button class="lesson-start-btn" onclick="event.stopPropagation(); startLesson('${category}', ${index})">
                ${isCompleted ? 'Practice Again' : exercisesCompleted > 0 ? 'Continue' : 'Start'}
              </button>
            ` : ''}
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
  }
  // ==== START LESSON ====
  window.startLesson = function(category, lessonIndex) {
  const lesson = LESSON_DATA[category].lessons[lessonIndex];
  if (!lesson) return;
  
  // Check if this is a game lesson
  if (lesson.type === 'game') {
    // Store current lesson info for games
    window.currentLesson = {
      category: category,
      lessonIndex: lessonIndex,
      lesson: lesson,
      currentExercise: 0
    };
    
    // Open lesson modal
    const modal = document.getElementById('lesson-practice-modal');
    modal.classList.remove('hidden');
    
    // Set up game instead of regular lesson
    setupGamePractice();
  } else {
    // Regular lesson setup (existing code)
    window.currentLesson = {
      category: category,
      lessonIndex: lessonIndex,
      lesson: lesson,
      currentExercise: 0,
      exerciseStartTime: null,
      exerciseText: '',
      exerciseTyped: '',
      exerciseResults: []
    };
    
    const modal = document.getElementById('lesson-practice-modal');
    modal.classList.remove('hidden');
    
    setupLessonPractice();
  }
};
  function setupLessonPractice() {
    const { lesson, currentExercise } = window.currentLesson;
    
    // Update modal title
    document.getElementById('lesson-practice-title').textContent = lesson.title;
    document.getElementById('lesson-practice-subtitle').textContent = 
      `${lesson.type === 'tutorial' ? 'Tutorial' : 'Exercise'} ${currentExercise + 1} of ${lesson.exercises || 1}`;
    
    // Show/hide tutorial instructions
    const tutorialBox = document.getElementById('tutorial-instructions');
    if (lesson.type === 'tutorial' && lesson.instructions) {
      tutorialBox.classList.remove('hidden');
      document.getElementById('tutorial-text').textContent = lesson.instructions;
    } else {
      tutorialBox.classList.add('hidden');
    }
    
    // Update target stats
    document.getElementById('lesson-target-wpm').textContent = lesson.targetWPM || '--';
    document.getElementById('lesson-target-accuracy').textContent = lesson.targetAccuracy ? `${lesson.targetAccuracy}%` : '--';
    document.getElementById('lesson-progress').textContent = `${currentExercise + 1}/${lesson.exercises || 1}`;
    
    // Generate exercise text
    window.currentLesson.exerciseText = generateLessonText(lesson, currentExercise);
    window.currentLesson.exerciseTyped = '';
    
    // Render virtual keyboard
    renderVirtualKeyboard(lesson.keys);
    
    // Render lesson text
    renderLessonText();
    
    // Setup input
    const input = document.getElementById('lesson-input');
    input.value = '';
    input.disabled = false;
    input.focus();
    
    // Reset stats
    document.getElementById('lesson-wpm').textContent = '0';
    document.getElementById('lesson-accuracy').textContent = '100%';
    
    // Update buttons
    document.getElementById('next-exercise-btn').disabled = true;
    
    // Start time tracking
    window.currentLesson.exerciseStartTime = Date.now();
  }

  function setupGamePractice() {
  const { lesson } = window.currentLesson;
  
  // Update modal title
  document.getElementById('lesson-practice-title').textContent = lesson.title;
  document.getElementById('lesson-practice-subtitle').textContent = lesson.description;
  
  // Hide tutorial instructions for games
  const tutorialBox = document.getElementById('tutorial-instructions');
  tutorialBox.classList.add('hidden');
  
  // Hide lesson stats (we'll use game stats instead)
  document.querySelector('.lesson-stats').style.display = 'none';
  
  // Hide lesson text display and input
  document.querySelector('.lesson-text-container').style.display = 'none';
  document.getElementById('lesson-input').style.display = 'none';
  
  // Hide virtual keyboard
  document.getElementById('virtual-keyboard').style.display = 'none';
  
  // Hide lesson action buttons initially
  document.querySelector('.lesson-actions').style.display = 'none';
  
  // Get the modal body where we'll inject the game
  const modalBody = document.querySelector('#lesson-practice-modal .modal-body');
  
  // Create game container
  const gameContainer = document.createElement('div');
  gameContainer.id = 'game-practice-container';
  gameContainer.style.marginTop = '2rem';
  
  // Insert game container before lesson stats
  const lessonStats = document.querySelector('.lesson-stats');
  lessonStats.parentNode.insertBefore(gameContainer, lessonStats);
  
  // Initialize the game
  const game = new TypingGame(lesson.gameType, lesson, (results) => {
    handleGameComplete(results, lesson);
  });
  
  game.init(gameContainer);
}
function handleGameComplete(results, lesson) {
  // Show lesson actions again
  document.querySelector('.lesson-actions').style.display = 'flex';
  
  // Check if passed
  const passedWPM = !lesson.targetWPM || results.wpm >= lesson.targetWPM;
  const passedAccuracy = !lesson.targetAccuracy || results.accuracy >= lesson.targetAccuracy;
  const passed = passedWPM && passedAccuracy;
  
  // Show completion message
  const message = passed 
    ? `🎉 Excellent! You scored ${results.score} points!\n${results.wpm} WPM • ${results.accuracy}% Accuracy`
    : `Good try! Keep practicing to reach the target.\nTarget: ${lesson.targetWPM} WPM • ${lesson.targetAccuracy}% Accuracy\nYou got: ${results.wpm} WPM • ${results.accuracy}% Accuracy`;
  
  // Create toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: ${passed ? 'linear-gradient(135deg, #51cf66, #37b24d)' : 'linear-gradient(135deg, #ffc107, #ff9800)'};
    color: white;
    padding: 20px 28px;
    border-radius: 12px;
    z-index: 10002;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    font-size: 1rem;
    animation: slideIn 0.3s ease;
    white-space: pre-line;
    max-width: 350px;
    line-height: 1.6;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 4000);
  
  // Always save progress (even if not passed) to track attempts
  const { category, lessonIndex } = window.currentLesson;
  
  // Get existing progress to preserve best scores
  const existingProgress = getLessonProgress(lesson.id);
  
  // Determine best WPM and accuracy
  const bestWPM = existingProgress && existingProgress.bestWPM 
    ? Math.max(existingProgress.bestWPM, results.wpm)
    : results.wpm;
    
  const bestAccuracy = existingProgress && existingProgress.bestAccuracy
    ? Math.max(existingProgress.bestAccuracy, results.accuracy)
    : results.accuracy;
    
  const bestScore = existingProgress && existingProgress.bestScore
    ? Math.max(existingProgress.bestScore, results.score)
    : results.score;
  
  // Save progress
  const progress = {
    completed: passed, // Only mark as completed if passed
    exercisesCompleted: passed ? 1 : (existingProgress?.exercisesCompleted || 0),
    bestWPM: bestWPM,
    bestAccuracy: bestAccuracy,
    bestScore: bestScore,
    lastAttemptWPM: results.wpm,
    lastAttemptAccuracy: results.accuracy,
    lastAttemptScore: results.score,
    attempts: (existingProgress?.attempts || 0) + 1,
    completedAt: passed ? Date.now() : (existingProgress?.completedAt || null)
  };
  
  saveLessonProgress(lesson.id, progress);
  
  // Update button states
  if (passed) {
    document.getElementById('next-exercise-btn').disabled = false;
    document.getElementById('next-exercise-btn').textContent = 'Complete Game';
    
    // Show completion alert
    setTimeout(() => {
      alert(`🎮 Game completed!\n\nScore: ${results.score}\nWPM: ${results.wpm}\nAccuracy: ${results.accuracy}%\n\n${results.maxCombo ? `Max Combo: ${results.maxCombo}x\n` : ''}Great job!`);
    }, 500);
  } else {
    // Enable retry
    document.getElementById('restart-lesson-btn').textContent = 'Try Again';
    document.getElementById('restart-lesson-btn').disabled = false;
    document.getElementById('next-exercise-btn').disabled = true;
  }
  
  // Refresh the lessons page to show updated progress
  if (typeof loadLessonsPage === 'function') {
    loadLessonsPage();
  }
}
  // ==== CERTIFICATE GENERATION SYSTEM ====
  
  function generateCertificate(userName, completionDate, stats) {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
      <div class="certificate-overlay"></div>
      <div class="certificate-container">
        <button class="certificate-close" onclick="this.parentElement.parentElement.remove()">×</button>
        
        <div class="certificate" id="certificate-content">
          <!-- Decorative Border -->
          <div class="certificate-border">
            <div class="certificate-border-inner">
              
              <!-- Header -->
              <div class="certificate-header">
                <div class="certificate-logo">🏆</div>
                <h1 class="certificate-title">Certificate of Excellence</h1>
                <p class="certificate-subtitle">Touch Typing Mastery</p>
              </div>
              
              <!-- Body -->
              <div class="certificate-body">
                <p class="certificate-text">This is to certify that</p>
                <h2 class="certificate-name">${userName}</h2>
                <p class="certificate-text">has successfully completed the</p>
                <h3 class="certificate-course">Advanced Touch Typing Course</h3>
                <p class="certificate-text">demonstrating exceptional skill and dedication</p>
                
                <!-- Stats -->
                <div class="certificate-stats">
                  <div class="certificate-stat">
                    <div class="certificate-stat-value">${stats.avgWPM}</div>
                    <div class="certificate-stat-label">Average WPM</div>
                  </div>
                  <div class="certificate-stat">
                    <div class="certificate-stat-value">${stats.maxWPM}</div>
                    <div class="certificate-stat-label">Peak WPM</div>
                  </div>
                  <div class="certificate-stat">
                    <div class="certificate-stat-value">${stats.avgAccuracy}%</div>
                    <div class="certificate-stat-label">Accuracy</div>
                  </div>
                  <div class="certificate-stat">
                    <div class="certificate-stat-value">50</div>
                    <div class="certificate-stat-label">Lessons</div>
                  </div>
                </div>
                
                <!-- Skills Achieved -->
                <div class="certificate-skills">
                  <h4 class="certificate-skills-title">Skills Mastered</h4>
                  <div class="certificate-skills-grid">
                    <span class="certificate-skill">✓ Touch Typing</span>
                    <span class="certificate-skill">✓ Speed Typing</span>
                    <span class="certificate-skill">✓ Audio Transcription</span>
                    <span class="certificate-skill">✓ Code Typing</span>
                    <span class="certificate-skill">✓ Professional Documents</span>
                    <span class="certificate-skill">✓ Complex Patterns</span>
                  </div>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="certificate-footer">
                <div class="certificate-signature-section">
                  <div class="certificate-signature">
                    <div class="certificate-signature-line"></div>
                    <p class="certificate-signature-name">SoftFingers Pro</p>
                    <p class="certificate-signature-title">Typing Platform</p>
                  </div>
                  <div class="certificate-date-section">
                    <p class="certificate-date-label">Date of Completion</p>
                    <p class="certificate-date">${completionDate}</p>
                  </div>
                </div>
                
                <!-- Certificate ID -->
                <div class="certificate-id">
                  <p>Certificate ID: SF-${generateCertificateID()}</p>
                </div>
              </div>
              
              <!-- Seal -->
              <div class="certificate-seal">
                <div class="certificate-seal-inner">
                  <div class="certificate-seal-text">
                    <div>CERTIFIED</div>
                    <div class="certificate-seal-year">${new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="certificate-actions">
          <button class="btn" onclick="downloadCertificateFunc()">
            📥 Download Certificate
          </button>
          <button class="btn btn-secondary" onclick="printCertificateFunc()">
            🖨️ Print Certificate
          </button>
          <button class="btn btn-secondary" onclick="shareCertificateFunc()">
            🔗 Share Certificate
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger celebration animation
    celebrateCertificate();
  }
  
  function generateCertificateID() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`.toUpperCase();
  }
  
  window.downloadCertificateFunc = function() {
    alert('Certificate download feature coming soon! You can print this certificate using the Print button.');
  };
  
  window.printCertificateFunc = function() {
    window.print();
  };
  
  window.shareCertificateFunc = function() {
    const shareText = `I just completed the Advanced Touch Typing Course on SoftFingers Pro! 🎉`;
    const shareURL = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'SoftFingers Certificate',
        text: shareText,
        url: shareURL
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareURL}`).then(() => {
        alert('Certificate link copied to clipboard!');
      });
    }
  };
  
  function celebrateCertificate() {
    const colors = ['#9f7cff', '#6b4eff', '#51cf66', '#ffc107', '#ff6b6b'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }, i * 30);
    }
  }
  
  function checkAdvancedCompletion() {
    if (!currentUser || !LESSON_DATA.advanced) return false;
    
    const lessons = LESSON_DATA.advanced.lessons;
    const lastLesson = lessons[lessons.length - 1];
    const progress = getLessonProgress(lastLesson.id);
    
    return progress && progress.completed;
  }
  
  function checkAndShowCertificate() {
    if (checkAdvancedCompletion()) {
      const certificateShown = localStorage.getItem(`certificate_shown_${currentUser.uid}`);
      
      if (!certificateShown) {
        // Calculate stats
        const lessons = LESSON_DATA.advanced.lessons;
        let totalWPM = 0;
        let maxWPM = 0;
        let totalAccuracy = 0;
        let count = 0;
        
        lessons.forEach(lesson => {
          const progress = getLessonProgress(lesson.id);
          if (progress) {
            if (progress.bestWPM) {
              totalWPM += progress.bestWPM;
              if (progress.bestWPM > maxWPM) maxWPM = progress.bestWPM;
            }
            if (progress.bestAccuracy) {
              totalAccuracy += progress.bestAccuracy;
            }
            count++;
          }
        });
        
        const stats = {
          avgWPM: count > 0 ? Math.round(totalWPM / count) : 0,
          maxWPM: maxWPM,
          avgAccuracy: count > 0 ? Math.round(totalAccuracy / count) : 0
        };
        
        const userName = currentUser.email.split('@')[0];
        const completionDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        setTimeout(() => {
          generateCertificate(userName, completionDate, stats);
          localStorage.setItem(`certificate_shown_${currentUser.uid}`, 'true');
        }, 1000);
      }
    }
  }
 // ==== VIRTUAL KEYBOARD ====
  function renderVirtualKeyboard(highlightKeys = []) {
    const keyboard = document.getElementById('virtual-keyboard');
    
    // Add hand visualization HTML
    const handsHTML = `
      <div class="keyboard-hands">
        <div class="hand-container">
          <div class="hand-visual">
            <div class="finger pinky" data-finger="left-pinky">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger ring" data-finger="left-ring">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger middle" data-finger="left-middle">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger index" data-finger="left-index">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger thumb" data-finger="left-thumb">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
          </div>
          <div class="hand-label">Left Hand Fingers</div>
        </div>
        
        <div class="hand-container">
          <div class="hand-visual">
            <div class="finger thumb" data-finger="right-thumb">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger index" data-finger="right-index">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger middle" data-finger="right-middle">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger ring" data-finger="right-ring">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
            <div class="finger pinky" data-finger="right-pinky">
              <div class="finger-tip"></div>
              <div class="finger-segment"></div>
            </div>
          </div>
          <div class="hand-label">Right Hand Fingers</div>
        </div>
      </div>
    `;
    
    const keyboardLayout = [
      [
        { main: '`', shift: '~' },
        { main: '1', shift: '!' },
        { main: '2', shift: '@' },
        { main: '3', shift: '#' },
        { main: '4', shift: '$' },
        { main: '5', shift: '%' },
        { main: '6', shift: '^' },
        { main: '7', shift: '&' },
        { main: '8', shift: '*' },
        { main: '9', shift: '(' },
        { main: '0', shift: ')' },
        { main: '-', shift: '_' },
        { main: '=', shift: '+' },
        'Backspace'
      ],
      [
        'Tab',
        { main: 'q', shift: 'Q' },
        { main: 'w', shift: 'W' },
        { main: 'e', shift: 'E' },
        { main: 'r', shift: 'R' },
        { main: 't', shift: 'T' },
        { main: 'y', shift: 'Y' },
        { main: 'u', shift: 'U' },
        { main: 'i', shift: 'I' },
        { main: 'o', shift: 'O' },
        { main: 'p', shift: 'P' },
        { main: '[', shift: '{' },
        { main: ']', shift: '}' },
        { main: '\\', shift: '|' }
      ],
      [
        'Caps',
        { main: 'a', shift: 'A' },
        { main: 's', shift: 'S' },
        { main: 'd', shift: 'D' },
        { main: 'f', shift: 'F' },
        { main: 'g', shift: 'G' },
        { main: 'h', shift: 'H' },
        { main: 'j', shift: 'J' },
        { main: 'k', shift: 'K' },
        { main: 'l', shift: 'L' },
        { main: ';', shift: ':' },
        { main: "'", shift: '"' },
        'Enter'
      ],
      [
        'Shift',
        { main: 'z', shift: 'Z' },
        { main: 'x', shift: 'X' },
        { main: 'c', shift: 'C' },
        { main: 'v', shift: 'V' },
        { main: 'b', shift: 'B' },
        { main: 'n', shift: 'N' },
        { main: 'm', shift: 'M' },
        { main: ',', shift: '<' },
        { main: '.', shift: '>' },
        { main: '/', shift: '?' },
        'Shift'
      ],
      ['Space']
    ];
    
    const homeRowKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const fingerHints = {
      '`': 'LP', '1': 'LP', 'q': 'LP', 'a': 'LP', 'z': 'LP',
      '2': 'LR', 'w': 'LR', 's': 'LR', 'x': 'LR',
      '3': 'LM', 'e': 'LM', 'd': 'LM', 'c': 'LM',
      '4': 'LI', '5': 'LI', 'r': 'LI', 't': 'LI', 'f': 'LI', 'g': 'LI', 'v': 'LI', 'b': 'LI',
      '6': 'RI', '7': 'RI', 'y': 'RI', 'u': 'RI', 'h': 'RI', 'j': 'RI', 'n': 'RI', 'm': 'RI',
      '8': 'RM', 'i': 'RM', 'k': 'RM', ',': 'RM',
      '9': 'RR', 'o': 'RR', 'l': 'RR', '.': 'RR',
      '0': 'RP', '-': 'RP', '=': 'RP', 'p': 'RP', '[': 'RP', ']': 'RP', ';': 'RP', "'": 'RP', '/': 'RP'
    };
    
    let html = handsHTML;
    
    keyboardLayout.forEach(row => {
      html += '<div class="keyboard-row">';
      
      row.forEach(key => {
        if (typeof key === 'string') {
          let keyClass = 'key';
          if (key === 'Backspace' || key === 'Enter' || key === 'Tab' || key === 'Caps') {
            keyClass += ' wide';
          } else if (key === 'Shift') {
            keyClass += ' wider';
          } else if (key === 'Space') {
            keyClass += ' space';
          }
          
          html += `
            <div class="${keyClass}" data-key="${key.toLowerCase()}">
              ${key === 'Space' ? 'Space' : key}
            </div>
          `;
        } else {
          const mainKey = key.main;
          const shiftKey = key.shift;
          const isHomeRow = homeRowKeys.includes(mainKey.toLowerCase());
          const fingerHint = fingerHints[mainKey.toLowerCase()] || '';
          
          let keyClass = 'key';
          if (isHomeRow) keyClass += ' home-row';
          
          html += `
            <div class="${keyClass}" data-key="${mainKey.toLowerCase()}">
              <div class="key-main">
                <span class="key-shift">${shiftKey}</span>
                <span class="key-normal">${mainKey}</span>
              </div>
              ${fingerHint ? `<span class="finger-hint">${fingerHint}</span>` : ''}
            </div>
          `;
        }
      });
      
      html += '</div>';
    });
    
    keyboard.innerHTML = html;
  }
    
  // Highlight next key on keyboard
  function highlightNextKey(nextChar) {
    // Remove all highlights
    document.querySelectorAll('.key').forEach(key => {
      key.classList.remove('next', 'pressed');
    });
    
    if (!nextChar || nextChar === ' ') {
      const spaceKey = document.querySelector('[data-key="space"]');
      if (spaceKey) spaceKey.classList.add('next');
      return;
    }
    
    // Find and highlight the next key
    const key = document.querySelector(`[data-key="${nextChar.toLowerCase()}"]`);
    if (key) {
      key.classList.add('next');
    }
  }
  
  // Flash key as pressed
 // Flash key as pressed
  function flashKeyPressed(char) {
    const keyElement = char === ' ' ? 
      document.querySelector('[data-key="space"]') :
      document.querySelector(`[data-key="${char.toLowerCase()}"]`);
    
    if (keyElement) {
      keyElement.classList.add('pressed');
      setTimeout(() => {
        keyElement.classList.remove('pressed');
      }, 200);
    }
    
    // Also flash the finger
    if (char === ' ') {
      const leftThumb = document.querySelector('[data-finger="left-thumb"]');
      const rightThumb = document.querySelector('[data-finger="right-thumb"]');
      if (leftThumb) {
        leftThumb.classList.add('active');
        setTimeout(() => leftThumb.classList.remove('active'), 200);
      }
      if (rightThumb) {
        rightThumb.classList.add('active');
        setTimeout(() => rightThumb.classList.remove('active'), 200);
      }
    } else {
      const fingerHints = {
        '`': 'LP', '1': 'LP', 'q': 'LP', 'a': 'LP', 'z': 'LP',
        '2': 'LR', 'w': 'LR', 's': 'LR', 'x': 'LR',
        '3': 'LM', 'e': 'LM', 'd': 'LM', 'c': 'LM',
        '4': 'LI', '5': 'LI', 'r': 'LI', 't': 'LI', 'f': 'LI', 'g': 'LI', 'v': 'LI', 'b': 'LI',
        '6': 'RI', '7': 'RI', 'y': 'RI', 'u': 'RI', 'h': 'RI', 'j': 'RI', 'n': 'RI', 'm': 'RI',
        '8': 'RM', 'i': 'RM', 'k': 'RM', ',': 'RM',
        '9': 'RR', 'o': 'RR', 'l': 'RR', '.': 'RR',
        '0': 'RP', '-': 'RP', '=': 'RP', 'p': 'RP', '[': 'RP', ']': 'RP', ';': 'RP', "'": 'RP', '/': 'RP'
      };
      
      const fingerMap = {
        'LP': 'left-pinky',
        'LR': 'left-ring',
        'LM': 'left-middle',
        'LI': 'left-index',
        'RP': 'right-pinky',
        'RR': 'right-ring',
        'RM': 'right-middle',
        'RI': 'right-index'
      };
      
      const fingerCode = fingerHints[char.toLowerCase()];
      const fingerElement = fingerCode ? document.querySelector(`[data-finger="${fingerMap[fingerCode]}"]`) : null;
      
      if (fingerElement) {
        fingerElement.classList.add('active');
        setTimeout(() => fingerElement.classList.remove('active'), 200);
      }
    }
  }
  // ==== LESSON TEXT RENDERING ====
  function renderLessonText() {
    const { exerciseText, exerciseTyped } = window.currentLesson;
    const display = document.getElementById('lesson-text-display');
    
    let html = '';
    
    for (let i = 0; i < exerciseText.length; i++) {
      const char = exerciseText[i];
      const typedChar = exerciseTyped[i];
      
      let charClass = 'char';
      
      if (i === exerciseTyped.length) {
        charClass += ' current';
      } else if (typedChar !== undefined) {
        if (typedChar === char) {
          charClass += ' correct';
        } else {
          charClass += ' incorrect';
        }
      }
      
      html += `<span class="${charClass}">${char === ' ' ? '&nbsp;' : char}</span>`;
    }
    
    display.innerHTML = html;
    
    // Highlight next key on keyboard
    const nextChar = exerciseText[exerciseTyped.length];
    highlightNextKey(nextChar);
  }
  // ==== LESSON INPUT HANDLER ====
  const lessonInput = document.getElementById('lesson-input');
  
  if (lessonInput) {
    lessonInput.addEventListener('input', (e) => {
      if (!window.currentLesson) return;
       if (!window.currentLesson.exerciseStartTime) {
    window.currentLesson.exerciseStartTime = Date.now();
       }
      const { exerciseText, exerciseStartTime } = window.currentLesson;
      const typed = e.target.value;
      
      // Update typed text
      window.currentLesson.exerciseTyped = typed;
      
      // Flash the key that was just pressed
      if (typed.length > 0) {
        flashKeyPressed(typed[typed.length - 1]);
      }
      
      // Render updated text
      renderLessonText();
      

      // Calculate stats
  const elapsed = exerciseStartTime ? (Date.now() - exerciseStartTime) / 1000 : 0;
  
  if (elapsed > 0) {
        // Calculate WPM
        const wordsTyped = typed.length / 5;
        const minutes = elapsed / 60;
        const wpm = Math.round(wordsTyped / minutes);
        
        // Calculate accuracy
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
          if (typed[i] === exerciseText[i]) correct++;
        }
        const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
        
        // Update display
        document.getElementById('lesson-wpm').textContent = wpm;
        document.getElementById('lesson-accuracy').textContent = accuracy + '%';
      }
      
      // Check if exercise is complete
      if (typed.length >= exerciseText.length) {
        finishLessonExercise();
      }
    });
    
    lessonInput.addEventListener('paste', e => e.preventDefault());
  }
  // ==== FINISH LESSON EXERCISE ====
 function finishLessonExercise() {
  const { lesson, exerciseText, exerciseTyped, exerciseStartTime, currentExercise, exerciseResults } = window.currentLesson;
  
  // Disable input
  const input = document.getElementById('lesson-input');
  input.disabled = true;
  
  // Calculate final stats - use proper fallback if timer wasn't started
  const elapsed = exerciseStartTime ? (Date.now() - exerciseStartTime) / 1000 : 1;
    const wordsTyped = exerciseTyped.length / 5;
    const minutes = elapsed / 60;
    const wpm = Math.round(wordsTyped / minutes);
    
    let correct = 0;
    for (let i = 0; i < exerciseTyped.length; i++) {
      if (exerciseTyped[i] === exerciseText[i]) correct++;
    }
    const accuracy = Math.round((correct / exerciseTyped.length) * 100);
    
    // Store result
    exerciseResults.push({ wpm, accuracy });
    
    // Check if passed
    const isTutorial = lesson.type === 'tutorial';
    const passedWPM = isTutorial || !lesson.targetWPM || wpm >= lesson.targetWPM;
    const passedAccuracy = isTutorial || !lesson.targetAccuracy || accuracy >= lesson.targetAccuracy;
    const passed = passedWPM && passedAccuracy;
    
    // Show result
    if (passed) {
      showLessonResult(true, wpm, accuracy, lesson);
    } else {
      showLessonResult(false, wpm, accuracy, lesson);
    }
  }
  
function showLessonResult(passed, wpm, accuracy, lesson) {
  const message = passed ? 
    `✅ Excellent! ${wpm} WPM • ${accuracy}%` :
    `⚠️ Try again! Target: ${lesson.targetWPM} WPM • ${lesson.targetAccuracy}%\nYou got: ${wpm} WPM • ${accuracy}%`;
  
  // Show toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: ${passed ? 'linear-gradient(135deg, #51cf66, #37b24d)' : 'linear-gradient(135deg, #ffc107, #ff9800)'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10002;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    animation: slideIn 0.3s ease;
    white-space: pre-line;
    max-width: 300px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
  
  // Update progress
  if (passed) {
    const { currentExercise, exerciseResults, lesson, category, lessonIndex } = window.currentLesson;
    
    // Check if all exercises completed
    if (currentExercise + 1 >= (lesson.exercises || 1)) {
      // Lesson completed!
      completeLessonProgress(category, lessonIndex, exerciseResults);
      
      // Enable next exercise button (which will actually close)
      document.getElementById('next-exercise-btn').disabled = false;
      document.getElementById('next-exercise-btn').textContent = 'Complete Lesson';
    } else {
      // Auto-proceed to next exercise after short delay
      setTimeout(() => {
        window.currentLesson.currentExercise++;
        setupLessonPractice();
      }, 1500); // 1.5 second delay to show the success message
    }
  } else {
    // Failed - automatically retry
    setTimeout(() => {
      // Reset for retry
      setupLessonPractice();
    }, 2000); // 2 second delay to show the fail message
  }
}
  
 function completeLessonProgress(category, lessonIndex, exerciseResults) {
    const lesson = LESSON_DATA[category].lessons[lessonIndex];
    
    // Calculate best stats
    const bestWPM = Math.max(...exerciseResults.map(r => r.wpm));
    const avgAccuracy = Math.round(exerciseResults.reduce((sum, r) => sum + r.accuracy, 0) / exerciseResults.length);
    
    // Save progress
    const progress = {
      completed: true,
      exercisesCompleted: lesson.exercises || 1,
      bestWPM: bestWPM,
      bestAccuracy: avgAccuracy,
      completedAt: Date.now()
    };
    
    saveLessonProgress(lesson.id, progress);
    
    // Check if this is the final lesson with certificate
    const isFinalLesson = lessonIndex === LESSON_DATA[category].lessons.length - 1;
    const isAdvancedFinal = category === 'advanced' && lesson.isFinalExam;
    
    if (isAdvancedFinal || (isFinalLesson && category === 'advanced')) {
      // Show completion message
      setTimeout(() => {
        alert(`🎉 Congratulations! You've completed the ${category} level!\n\nBest WPM: ${bestWPM}\nAverage Accuracy: ${avgAccuracy}%\n\nPreparing your certificate...`);
        
        // Show certificate after a delay
        setTimeout(() => {
          checkAndShowCertificate();
        }, 1000);
      }, 500);
    } else {
      // Regular lesson completion
      setTimeout(() => {
        alert(`🎉 Lesson completed!\n\nBest WPM: ${bestWPM}\nAverage Accuracy: ${avgAccuracy}%\n\n${lessonIndex + 1 < LESSON_DATA[category].lessons.length ? 'Next lesson unlocked!' : 'Category completed! 🏆'}`);
      }, 500);
    }
  }
  // ==== LESSON MODAL BUTTON HANDLERS ====
  const closeLessonModal = document.getElementById('close-lesson-modal');
  const exitLessonBtn = document.getElementById('exit-lesson-btn');
  const restartLessonBtn = document.getElementById('restart-lesson-btn');
  const nextExerciseBtn = document.getElementById('next-exercise-btn');
  
  if (closeLessonModal) {
    closeLessonModal.addEventListener('click', () => {
      if (confirm('Are you sure you want to exit this lesson? Your progress will be saved.')) {
        document.getElementById('lesson-practice-modal').classList.add('hidden');
        window.currentLesson = null;
        loadLessonsPage(); // Refresh lessons page
      }
    });
  }
  
  if (exitLessonBtn) {
    exitLessonBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to exit this lesson?')) {
        document.getElementById('lesson-practice-modal').classList.add('hidden');
        window.currentLesson = null;
        loadLessonsPage(); // Refresh lessons page
      }
    });
  }
  
 if (restartLessonBtn) {
  restartLessonBtn.addEventListener('click', () => {
    const { lesson } = window.currentLesson;
    
    if (lesson.type === 'game') {
      // For games, restart the game
      setupGamePractice();
    } else {
      // For regular lessons
      setupLessonPractice();
    }
  });
}
  
 if (nextExerciseBtn) {
  nextExerciseBtn.addEventListener('click', () => {
    const { lesson, currentExercise } = window.currentLesson;
    
    if (lesson.type === 'game') {
      // For games, just close the modal
      document.getElementById('lesson-practice-modal').classList.add('hidden');
      
      // Clean up
      const gameContainer = document.getElementById('game-practice-container');
      if (gameContainer) gameContainer.remove();
      
      // Reset displays
      document.querySelector('.lesson-stats').style.display = 'grid';
      document.querySelector('.lesson-text-container').style.display = 'block';
      document.getElementById('lesson-input').style.display = 'block';
      document.getElementById('virtual-keyboard').style.display = 'block';
      document.querySelector('.lesson-actions').style.display = 'flex';
      
      window.currentLesson = null;
      loadLessonsPage(); // Refresh lessons page
    } else {
      // Regular lesson logic
      if (currentExercise + 1 >= (lesson.exercises || 1)) {
        document.getElementById('lesson-practice-modal').classList.add('hidden');
        window.currentLesson = null;
        loadLessonsPage();
      } else {
        window.currentLesson.currentExercise++;
        setupLessonPractice();
      }
    }
  });
}
  function setupLessonPractice() {
    const { lesson, currentExercise } = window.currentLesson;
    
    // Update modal title
    document.getElementById('lesson-practice-title').textContent = lesson.title;
    document.getElementById('lesson-practice-subtitle').textContent = 
      `${lesson.type === 'tutorial' ? 'Tutorial' : lesson.type === 'audio' ? 'Audio Transcription' : 'Exercise'} ${currentExercise + 1} of ${lesson.exercises || 1}`;
    
    // Show/hide tutorial instructions
    const tutorialBox = document.getElementById('tutorial-instructions');
    if (lesson.type === 'tutorial' && lesson.instructions) {
      tutorialBox.classList.remove('hidden');
      document.getElementById('tutorial-text').textContent = lesson.instructions;
    } else if (lesson.type === 'audio') {
      // Show audio-specific instructions
      tutorialBox.classList.remove('hidden');
      document.getElementById('tutorial-text').innerHTML = `
        <strong>🎧 Audio Transcription Exercise</strong><br>
        Click the "Play Audio" button below to hear the text. Listen carefully and type exactly what you hear.
        <br><br>
        <button class="btn" id="play-audio-btn" style="margin-top: 12px;">
          ▶️ Play Audio
        </button>
        <button class="btn btn-secondary" id="replay-audio-btn" style="margin-top: 12px; display: none;">
          🔄 Replay Audio
        </button>
      `;
      
      // Set up audio playback
      setTimeout(() => {
        setupAudioPlayback(lesson);
      }, 100);
    } else {
      tutorialBox.classList.add('hidden');
    }
    
    // Update target stats
    document.getElementById('lesson-target-wpm').textContent = lesson.targetWPM || '--';
    document.getElementById('lesson-target-accuracy').textContent = lesson.targetAccuracy ? `${lesson.targetAccuracy}%` : '--';
    document.getElementById('lesson-progress').textContent = `${currentExercise + 1}/${lesson.exercises || 1}`;
    
    // For audio lessons, hide the text initially
    if (lesson.type === 'audio') {
      window.currentLesson.exerciseText = lesson.audioText || generateLessonText(lesson, currentExercise);
      window.currentLesson.exerciseTyped = '';
      window.currentLesson.audioPlayed = false;
      
      // Hide keyboard for audio lessons
      document.getElementById('virtual-keyboard').style.display = 'none';
      
      // Show placeholder text
      const display = document.getElementById('lesson-text-display');
      display.innerHTML = '<span style="color: #adb5bd; font-style: italic;">Click "Play Audio" to begin transcription...</span>';
      
      // Disable input until audio is played
      const input = document.getElementById('lesson-input');
      input.disabled = true;
      input.placeholder = 'Listen to the audio first...';
    } else {
      // Generate exercise text
      window.currentLesson.exerciseText = generateLessonText(lesson, currentExercise);
      window.currentLesson.exerciseTyped = '';
      
      // Show keyboard
      document.getElementById('virtual-keyboard').style.display = 'block';
      
      // Render virtual keyboard
      renderVirtualKeyboard(lesson.keys);
      
      // Render lesson text
      renderLessonText();
      
      // Setup input
      const input = document.getElementById('lesson-input');
      input.value = '';
      input.disabled = false;
      input.placeholder = 'Start typing...';
      input.focus();
    }
    
    // Reset stats
    document.getElementById('lesson-wpm').textContent = '0';
    document.getElementById('lesson-accuracy').textContent = '100%';
    
    // Update buttons
    document.getElementById('next-exercise-btn').disabled = true;
    
    // Start time tracking
    window.currentLesson.exerciseStartTime = null; // Will start when user begins typing
  }
  // ==== AUDIO LESSON FUNCTIONS ====
  function setupAudioPlayback(lesson) {
    const playBtn = document.getElementById('play-audio-btn');
    const replayBtn = document.getElementById('replay-audio-btn');
    
    if (!playBtn) return;
    
    playBtn.addEventListener('click', () => {
      playAudioLesson(lesson);
      playBtn.style.display = 'none';
      replayBtn.style.display = 'inline-block';
    });
    
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        playAudioLesson(lesson);
      });
    }
  }
  
  function playAudioLesson(lesson) {
    const text = lesson.audioText || window.currentLesson.exerciseText;
    
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set speech rate based on lesson speed
      if (lesson.audioSpeed === 'slow') {
        utterance.rate = 0.7;
      } else if (lesson.audioSpeed === 'medium') {
        utterance.rate = 0.9;
      } else if (lesson.audioSpeed === 'fast') {
        utterance.rate = 1.1;
      } else {
        utterance.rate = 1.0;
      }
      
      // Set other properties
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Show visual feedback during speech
      utterance.onstart = () => {
        const display = document.getElementById('lesson-text-display');
        display.innerHTML = '<span style="color: #9f7cff; font-style: italic;">🎧 Playing audio... Listen carefully!</span>';
      };
      
      utterance.onend = () => {
        // Enable input and show the text after audio finishes
        window.currentLesson.audioPlayed = true;
        
        // Show the actual text now
        renderLessonText();
        
        // Enable input
        const input = document.getElementById('lesson-input');
        input.disabled = false;
        input.placeholder = 'Type what you heard...';
        input.focus();
        
        // Start timer
        window.currentLesson.exerciseStartTime = Date.now();
        
        // Show completion message
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          top: 100px;
          right: 24px;
          background: linear-gradient(135deg, #51cf66, #37b24d);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 10002;
          font-weight: 600;
          animation: slideIn 0.3s ease;
        `;
        toast.textContent = '✅ Audio complete! Now type what you heard.';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: show text immediately if speech API not available
      alert('Audio playback is not supported in your browser. The text will be shown instead.');
      window.currentLesson.audioPlayed = true;
      renderLessonText();
      
      const input = document.getElementById('lesson-input');
      input.disabled = false;
      input.placeholder = 'Type the text...';
      input.focus();
      window.currentLesson.exerciseStartTime = Date.now();
    }
  }

  // ==== ELEMENTS (updated for new HTML structure) ====
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authCard = document.getElementById('auth-card');
  const authMessage = document.getElementById('auth-message');
  const forgotBtn = document.getElementById('forgot-btn');

  const userEmailTag = document.getElementById('user-email-tag');
  const emailVerifStatus = document.getElementById('email-verif-status');
  const logoutBtn = document.getElementById('logout-btn');
  const sendVerifBtn = document.getElementById('send-verif-btn');
  const authSummary = document.getElementById('auth-summary');

 const bestWPMEl = document.getElementById('best-wpm');
  const bestAccEl = document.getElementById('best-acc');
  const lastTestResults = document.getElementById('last-test-results');
  const resultsLoader = document.getElementById('results-loader');
  const resultsContent = document.getElementById('results-content');
  const lastWPMEl = document.getElementById('last-wpm');
  const lastAccEl = document.getElementById('last-acc');
  const lastCorrectEl = document.getElementById('last-correct');
  const lastIncorrectEl = document.getElementById('last-incorrect');
  const recentTableBody = document.querySelector('#recent-table tbody');
  const leaderboardBody = document.querySelector('#leaderboard-table tbody');

  // Dashboard sections to hide/show based on auth state (ONLY these two sections)
  const recentSection = document.querySelector('#recent-table').closest('.card');
  const leaderboardSection = document.querySelector('#leaderboard-table').closest('.card');

  const statTime = document.getElementById('stat-time');
  const statWPM = document.getElementById('stat-wpm');
  const statAcc = document.getElementById('stat-acc');
  const passageDisplay = document.getElementById('passage-display');
  const typingInput = document.getElementById('typing-input');
  const retryBtn = document.getElementById('retry-btn');
  const durationSelect = document.getElementById('duration-select');

  // Updated selectors for new structure
  const diffTabs = document.querySelectorAll('.difficulty-tab');
  const modeSelect = document.getElementById('mode-select');
  const quoteControls = document.getElementById('quote-controls');
  const quoteSelect = document.getElementById('quote-select');
  const quoteAuthorEl = document.getElementById('quote-author');

// Navigation tab switching
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('[id^="section-"]');
  const dashboardSection = document.getElementById('section-dashboard');
  const achievementsFullPage = document.getElementById('achievements-full-page');
  const competitionFullPage = document.getElementById('competition-full-page');
  const lessonsFullPage = document.getElementById('lessons-full-page');
  const bibleFullPage = document.getElementById('bible-full-page');
  
  // Get references to all dashboard elements we need to hide
  const typingCard = document.querySelector('.typing-card');
  const sidebar = document.querySelector('.sidebar');
  const recentTestsCard = recentSection; // Already defined earlier
  const leaderboardCard = leaderboardSection; // Already defined earlier
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      if (this.onclick) return; // Skip if has onclick handler (but we removed it)
      
      const feature = this.dataset.feature;
      
      // Update active nav tab
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Clear competition mode if leaving dashboard (except when going to competition/lessons page)
      if (feature !== 'dashboard' && feature !== 'competition' && feature !== 'lessons') {
        const competitionMode = localStorage.getItem('competitionMode');
        if (competitionMode === 'active') {
          if (confirm('You are in competition mode. Leaving will deactivate it. Continue?')) {
            localStorage.removeItem('activeCompetition');
            localStorage.removeItem('competitionMode');
            const indicator = document.getElementById('competition-indicator');
            if (indicator) indicator.remove();
          } else {
            // User cancelled, reactivate dashboard tab
            setTimeout(() => {
              navTabs.forEach(t => t.classList.remove('active'));
              document.querySelector('[data-feature="dashboard"]').classList.add('active');
            }, 0);
            return;
          }
        }
      }
      
      // Handle achievements - show full page
      if (feature === 'achievements') {
        console.log('Achievements clicked');
        
        // Hide all dashboard elements
        if (typingCard) typingCard.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (recentTestsCard) recentTestsCard.style.display = 'none';
        if (leaderboardCard) leaderboardCard.style.display = 'none';
        
        // Show achievements full page
        achievementsFullPage.classList.remove('hidden');
        competitionFullPage.classList.add('hidden');
        if (lessonsFullPage) lessonsFullPage.classList.add('hidden');
        
        if (currentUser) {
          renderAchievements();
        } else {
          const container = document.getElementById('achievements-container');
          if (container) {
            container.innerHTML = `
              <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p class="text-muted">Sign in to track your achievements and unlock badges!</p>
              </div>
            `;
          }
        }
      } else if (feature === 'competition') {
        console.log('Competition clicked');
        
        // Hide all dashboard elements
        if (typingCard) typingCard.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (recentTestsCard) recentTestsCard.style.display = 'none';
        if (leaderboardCard) leaderboardCard.style.display = 'none';
        
        // Show competition full page
        competitionFullPage.classList.remove('hidden');
        achievementsFullPage.classList.add('hidden');
        if (lessonsFullPage) lessonsFullPage.classList.add('hidden');
        
        if (currentUser) {
          loadCompetitions();
        } else {
          document.getElementById('my-competitions-list').innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
              <p class="text-muted">Sign in to create and join competitions!</p>
            </div>
          `;
        }
      } else if (feature === 'lessons') {
        console.log('Lessons clicked');
        
        
        // Hide all dashboard elements
        if (typingCard) typingCard.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (recentTestsCard) recentTestsCard.style.display = 'none';
        if (leaderboardCard) leaderboardCard.style.display = 'none';
        
        // Show lessons full page
        if (lessonsFullPage) {
          lessonsFullPage.classList.remove('hidden');
          achievementsFullPage.classList.add('hidden');
          competitionFullPage.classList.add('hidden');
          
          if (currentUser) {
            loadLessonsPage();
          } else {
            lessonsFullPage.innerHTML = `
              <div style="text-align: center; padding: 40px;">
                <h2 style="margin-bottom: 16px;">Welcome to Typing Lessons</h2>
                <p class="text-muted">Sign in to access typing lessons and track your progress!</p>
              </div>
            `;
          }
        }
    
      } else if (feature === 'bible') {
  if (typingCard) typingCard.style.display = 'none';
  if (sidebar) sidebar.style.display = 'none';
  if (recentTestsCard) recentTestsCard.style.display = 'none';
  if (leaderboardCard) leaderboardCard.style.display = 'none';
  
  if (bibleFullPage) {
    bibleFullPage.classList.remove('hidden');
    achievementsFullPage.classList.add('hidden');
    competitionFullPage.classList.add('hidden');
    if (lessonsFullPage) lessonsFullPage.classList.add('hidden');
    
    loadBiblePage();
  }
} else if (feature === 'dashboard') {
        // Show dashboard section
        if (dashboardSection) dashboardSection.style.display = 'block';
        
        // Show all dashboard elements
        if (typingCard) typingCard.style.display = 'block';
        if (sidebar) sidebar.style.display = 'block';
        if (recentTestsCard && currentUser) recentTestsCard.style.display = 'block';
        if (leaderboardCard && currentUser) leaderboardCard.style.display = 'block';
        
        // Hide achievements, competition, and lessons full pages
        achievementsFullPage.classList.add('hidden');
        competitionFullPage.classList.add('hidden');
       if (lessonsFullPage) lessonsFullPage.classList.add('hidden');
if (bibleFullPage) bibleFullPage.classList.add('hidden');
        
        // Hide sidebar sections
        sections.forEach(section => {
          section.classList.add('hidden');
        });
        
        // Restore competition indicator if in competition mode
        const competitionMode = localStorage.getItem('competitionMode');
        const activeCompId = localStorage.getItem('activeCompetition');
        if (competitionMode === 'active' && activeCompId) {
          showCompetitionIndicator(activeCompId);
        }
        
        // Ensure typing input is focused and enabled
        focusTypingInput();
      }
       else {
        // Show dashboard but manage sidebar sections for other features
        if (typingCard) typingCard.style.display = 'block';
        if (sidebar) sidebar.style.display = 'block';
        if (recentTestsCard && currentUser) recentTestsCard.style.display = 'block';
        if (leaderboardCard && currentUser) leaderboardCard.style.display = 'block';
        
        achievementsFullPage.classList.add('hidden');
        competitionFullPage.classList.add('hidden');
        if (lessonsFullPage) lessonsFullPage.classList.add('hidden');
        
        sections.forEach(section => {
          if (section.id === `section-${feature}`) {
            section.classList.remove('hidden');
          } else {
            section.classList.add('hidden');
          }
        });
      }
    });
  });
  // Competition tab switching
  const competitionTabs = document.querySelectorAll('.competition-tab');
  const competitionTabContents = document.querySelectorAll('.competition-tab-content');
  
  competitionTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      competitionTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      competitionTabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  // ==== DYNAMIC Story controls (auto-injected; no HTML change needed) ====
  const storyControls = document.createElement('div');
  storyControls.id = 'story-controls';
  storyControls.style.display = 'none';
  storyControls.className = 'select-group';
  storyControls.innerHTML = `
    <label class="select-label">Story</label>
    <div style="display: flex; gap: 8px;">
      <select id="story-chapter"></select>
      <select id="story-part" style="min-width:100px;">
        <option value="0">Part 1</option>
        <option value="1">Part 2</option>
      </select>
    </div>
    <div class="text-xs text-muted" id="story-meta" style="margin-top:4px;"></div>
  `;
 
 // ==== ACHIEVEMENTS SYSTEM ====
  const ACHIEVEMENTS = {
    speed: [
      { id: 'speed_25', title: 'Typing Apprentice', description: 'Reach 25 WPM', icon: '🎯', requirement: 25 },
      { id: 'speed_40', title: 'Steady Typist', description: 'Reach 40 WPM', icon: '⚡', requirement: 40 },
      { id: 'speed_60', title: 'Fast Fingers', description: 'Reach 60 WPM', icon: '🚀', requirement: 60 },
      { id: 'speed_80', title: 'Speed Demon', description: 'Reach 80 WPM', icon: '🔥', requirement: 80 },
      { id: 'speed_100', title: 'Century Club', description: 'Reach 100 WPM', icon: '💯', requirement: 100 },
      { id: 'speed_120', title: 'Elite Typist', description: 'Reach 120 WPM', icon: '👑', requirement: 120 },
      { id: 'speed_150', title: 'Lightning Hands', description: 'Reach 150 WPM', icon: '⚡', requirement: 150 },
      { id: 'speed_180', title: 'Superhuman', description: 'Reach 180 WPM', icon: '🦸', requirement: 180 }
    ],
    accuracy: [
      { id: 'acc_85', title: 'Improving', description: 'Achieve 85% accuracy', icon: '📈', requirement: 85 },
      { id: 'acc_90', title: 'Getting Accurate', description: 'Achieve 90% accuracy', icon: '🎪', requirement: 90 },
      { id: 'acc_95', title: 'Precision Typist', description: 'Achieve 95% accuracy', icon: '🎯', requirement: 95 },
      { id: 'acc_98', title: 'Near Perfect', description: 'Achieve 98% accuracy', icon: '💎', requirement: 98 },
      { id: 'acc_100', title: 'Flawless', description: 'Achieve 100% accuracy', icon: '✨', requirement: 100 }
    ],
    consistency: [
      { id: 'tests_5', title: 'First Steps', description: 'Complete 5 tests', icon: '👣', requirement: 5 },
      { id: 'tests_10', title: 'Getting Started', description: 'Complete 10 tests', icon: '📝', requirement: 10 },
      { id: 'tests_25', title: 'Committed Learner', description: 'Complete 25 tests', icon: '📖', requirement: 25 },
      { id: 'tests_50', title: 'Dedicated Learner', description: 'Complete 50 tests', icon: '📚', requirement: 50 },
      { id: 'tests_100', title: 'Century of Practice', description: 'Complete 100 tests', icon: '🏆', requirement: 100 },
      { id: 'tests_250', title: 'Practice Master', description: 'Complete 250 tests', icon: '🎓', requirement: 250 },
      { id: 'tests_500', title: 'Typing Legend', description: 'Complete 500 tests', icon: '⭐', requirement: 500 },
      { id: 'tests_1000', title: 'Typing God', description: 'Complete 1000 tests', icon: '👑', requirement: 1000 }
    ],
    difficulty: [
      { id: 'beginner_master', title: 'Beginner Master', description: '50 WPM on Beginner', icon: '🌱', requirement: { difficulty: 'Beginner', wpm: 50 } },
      { id: 'intermediate_master', title: 'Intermediate Master', description: '50 WPM on Intermediate', icon: '🌿', requirement: { difficulty: 'Intermediate', wpm: 50 } },
      { id: 'advanced_master', title: 'Advanced Master', description: '50 WPM on Advanced', icon: '🌳', requirement: { difficulty: 'Advanced', wpm: 50 } },
      { id: 'beginner_expert', title: 'Beginner Expert', description: '80 WPM on Beginner', icon: '🌟', requirement: { difficulty: 'Beginner', wpm: 80 } },
      { id: 'intermediate_expert', title: 'Intermediate Expert', description: '80 WPM on Intermediate', icon: '💫', requirement: { difficulty: 'Intermediate', wpm: 80 } },
      { id: 'advanced_expert', title: 'Advanced Expert', description: '80 WPM on Advanced', icon: '✨', requirement: { difficulty: 'Advanced', wpm: 80 } },
      { id: 'all_rounder', title: 'All-Rounder', description: 'Master all difficulties', icon: '🌟', requirement: 'all_difficulties' }
    ],
    endurance: [
      { id: 'sprint_30', title: 'Quick Sprint', description: 'Complete 30s test at 40+ WPM', icon: '🏃', requirement: { duration: 30, wpm: 40 } },
      { id: 'sprint_60', title: 'Minute Master', description: 'Complete 60s test at 50+ WPM', icon: '⏱️', requirement: { duration: 60, wpm: 50 } },
      { id: 'marathon_3min', title: 'Short Marathon', description: 'Complete 3 min test at 40+ WPM', icon: '🏃‍♂️', requirement: { duration: 180, wpm: 40 } },
      { id: 'marathon_5min', title: 'Marathon Runner', description: 'Complete 5 min test at 40+ WPM', icon: '🏅', requirement: { duration: 300, wpm: 40 } },
      { id: 'ultra_5min', title: 'Ultra Marathoner', description: 'Complete 5 min test at 60+ WPM', icon: '🥇', requirement: { duration: 300, wpm: 60 } }
    ],
    special: [
      { id: 'first_test', title: 'Welcome Aboard', description: 'Complete your first test', icon: '🎉', requirement: 'first_test' },
      { id: 'perfect_test', title: 'Perfect Performance', description: '100% accuracy & 60+ WPM', icon: '🌈', requirement: { accuracy: 100, wpm: 60 } },
      { id: 'speed_accuracy', title: 'Speed & Precision', description: '80+ WPM & 95+ accuracy', icon: '💫', requirement: { wpm: 80, accuracy: 95 } },
      { id: 'elite_combo', title: 'Elite Performance', description: '100+ WPM & 98+ accuracy', icon: '👑', requirement: { wpm: 100, accuracy: 98 } },
      { id: 'night_owl', title: 'Night Owl', description: 'Complete 10 tests after 10 PM', icon: '🦉', requirement: 'night_owl' },
      { id: 'early_bird', title: 'Early Bird', description: 'Complete 10 tests before 6 AM', icon: '🌅', requirement: 'early_bird' },
      { id: 'weekend_warrior', title: 'Weekend Warrior', description: 'Complete 20 tests on weekends', icon: '🎮', requirement: 'weekend_warrior' }
    ],
    streaks: [
      { id: 'streak_3', title: 'On a Roll', description: 'Complete tests 3 days in a row', icon: '🔥', requirement: { streak: 3 } },
      { id: 'streak_7', title: 'Week Warrior', description: 'Complete tests 7 days in a row', icon: '📅', requirement: { streak: 7 } },
      { id: 'streak_30', title: 'Monthly Champion', description: 'Complete tests 30 days in a row', icon: '📆', requirement: { streak: 30 } },
      { id: 'daily_grind', title: 'Daily Grinder', description: 'Complete 5 tests in one day', icon: '💪', requirement: 'daily_5_tests' },
      { id: 'productive_day', title: 'Productive Day', description: 'Complete 10 tests in one day', icon: '🚀', requirement: 'daily_10_tests' }
    ],
    modes: [
      { id: 'quote_master', title: 'Quote Master', description: 'Complete 20 quote tests', icon: '💬', requirement: { mode: 'quote', count: 20 } },
      { id: 'story_lover', title: 'Story Lover', description: 'Complete 20 story tests', icon: '📚', requirement: { mode: 'story', count: 20 } },
      { id: 'passage_expert', title: 'Passage Expert', description: 'Complete 50 random word tests', icon: '📝', requirement: { mode: 'passage', count: 50 } },
      { id: 'jack_of_all', title: 'Jack of All Trades', description: 'Complete 10 tests in each mode', icon: '🎭', requirement: 'all_modes' }
    ],
    milestones: [
      { id: 'total_words_1k', title: 'Wordsmith', description: 'Type 1,000 words total', icon: '✍️', requirement: { totalWords: 1000 } },
      { id: 'total_words_10k', title: 'Author', description: 'Type 10,000 words total', icon: '📖', requirement: { totalWords: 10000 } },
      { id: 'total_words_50k', title: 'Novelist', description: 'Type 50,000 words total', icon: '📚', requirement: { totalWords: 50000 } },
      { id: 'total_words_100k', title: 'Epic Writer', description: 'Type 100,000 words total', icon: '🏆', requirement: { totalWords: 100000 } },
      { id: 'error_free_10', title: 'Careful Typist', description: 'Complete 10 tests with 100% accuracy', icon: '✅', requirement: { perfectTests: 10 } },
      { id: 'error_free_50', title: 'Perfectionist', description: 'Complete 50 tests with 100% accuracy', icon: '💎', requirement: { perfectTests: 50 } }
    ]
  };
  // ==== LESSONS SYSTEM ====
  
 // Merge intermediate lessons when loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof INTERMEDIATE_LESSONS !== 'undefined') {
      Object.assign(LESSON_DATA, INTERMEDIATE_LESSONS);
      console.log('Intermediate lessons loaded successfully');
    }
  });
  // ==== ACHIEVEMENT FUNCTIONS ====
  function checkAchievements(testResult) {
    if (!currentUser) return;
    
    const newUnlocks = [];
    
    // Check each category
    Object.keys(ACHIEVEMENTS).forEach(category => {
      ACHIEVEMENTS[category].forEach(achievement => {
        const unlocked = isAchievementUnlocked(achievement.id);
        if (!unlocked && meetsRequirement(achievement, testResult)) {
          unlockAchievement(achievement.id);
          newUnlocks.push(achievement);
        }
      });
    });
    
    // Show notifications for new unlocks
    newUnlocks.forEach((ach, index) => {
      setTimeout(() => showAchievementNotification(ach), index * 500);
    });
  }
  
  function meetsRequirement(achievement, testResult) {
    const req = achievement.requirement;
    
    // Simple numeric requirements
    if (typeof req === 'number') {
      if (achievement.id.startsWith('speed_')) {
        return testResult.wpm >= req;
      }
      if (achievement.id.startsWith('acc_')) {
        return testResult.accuracy >= req;
      }
      if (achievement.id.startsWith('tests_')) {
        return testResult.totalTests >= req;
      }
    }
    
    // Complex requirements
    if (typeof req === 'object') {
      if (req.difficulty && req.wpm) {
        return testResult.difficulty === req.difficulty && testResult.wpm >= req.wpm;
      }
      if (req.duration && req.wpm) {
        return testResult.duration === req.duration && testResult.wpm >= req.wpm;
      }
      if (req.accuracy && req.wpm) {
        return testResult.accuracy >= req.accuracy && testResult.wpm >= req.wpm;
      }
    }
    
    // Special requirements
    if (req === 'first_test') {
      return testResult.totalTests >= 1;
    }
    if (req === 'all_difficulties') {
      return testResult.hasMasteredAllDifficulties;
    }
    
    return false;
  }
  
  function isAchievementUnlocked(achievementId) {
    const unlocked = localStorage.getItem(`achievement_${currentUser.uid}_${achievementId}`);
    return unlocked === 'true';
  }
  
  function unlockAchievement(achievementId) {
    localStorage.setItem(`achievement_${currentUser.uid}_${achievementId}`, 'true');
  }
  
  function showAchievementNotification(achievement) {
    const banner = document.createElement('div');
    banner.className = 'achievement-unlocked-banner';
    banner.innerHTML = `
      <div class="achievement-banner-header">
        <div class="achievement-banner-icon">${achievement.icon}</div>
        <div class="achievement-banner-text">
          <h4>Achievement Unlocked!</h4>
          <p><strong>${achievement.title}</strong></p>
          <p class="text-small">${achievement.description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    
    setTimeout(() => {
      banner.remove();
    }, 4000);
  }
  
 async function renderAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    if (!currentUser) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <p class="text-muted">Sign in to track your achievements and unlock badges!</p>
        </div>
      `;
      return;
    }
    
    // Show loading state
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <div class="loader" style="margin: 0 auto;"></div>
        <p class="text-muted" style="margin-top: 16px;">Loading achievements...</p>
      </div>
    `;
    
    try {
      // Get user stats
      const statsSnap = await db.collection('results')
        .where('uid', '==', currentUser.uid)
        .get();
      
      const totalTests = statsSnap.size;
      let maxWPM = 0;
      let maxAccuracy = 0;
      const difficultyMastery = { Beginner: false, Intermediate: false, Advanced: false };
      
      statsSnap.forEach(doc => {
        const data = doc.data();
        if (data.wpm > maxWPM) maxWPM = data.wpm;
        if (data.accuracy > maxAccuracy) maxAccuracy = data.accuracy;
        
        if (data.difficulty && data.wpm >= 50) {
          difficultyMastery[data.difficulty] = true;
        }
      });
      
      const hasMasteredAllDifficulties = Object.values(difficultyMastery).every(v => v);
      
      // Count unlocked achievements
      let totalUnlocked = 0;
      let totalAchievements = 0;
      
      Object.keys(ACHIEVEMENTS).forEach(category => {
        ACHIEVEMENTS[category].forEach(achievement => {
          totalAchievements++;
          if (isAchievementUnlocked(achievement.id)) {
            totalUnlocked++;
          }
        });
      });
      
      // Update summary stats
      const totalAchievementsEl = document.getElementById('total-achievements');
      const achievementPercentageEl = document.getElementById('achievement-percentage');
      
      if (totalAchievementsEl) {
        totalAchievementsEl.textContent = `${totalUnlocked}/${totalAchievements}`;
      }
      if (achievementPercentageEl) {
        const percentage = Math.round((totalUnlocked / totalAchievements) * 100);
        achievementPercentageEl.textContent = `${percentage}%`;
      }
      
      let html = '';
      
      Object.keys(ACHIEVEMENTS).forEach(category => {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        
        html += `
          <div class="achievement-category">
            <h3 class="achievement-category-title">${categoryName}</h3>
            <div class="achievement-category-grid">
        `;
        
        ACHIEVEMENTS[category].forEach(achievement => {
          const unlocked = isAchievementUnlocked(achievement.id);
          const progress = calculateProgress(achievement, {
            totalTests,
            maxWPM,
            maxAccuracy,
            hasMasteredAllDifficulties,
            difficultyMastery
          });
          
          html += `
            <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-header">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                  <h5 class="achievement-title">${achievement.title}</h5>
                  <p class="achievement-description">${achievement.description}</p>
                </div>
              </div>
              ${!unlocked ? `
                <div class="achievement-progress">
                  <div class="achievement-progress-label">
                    <span>Progress</span>
                    <span>${Math.round(progress)}%</span>
                  </div>
                  <div class="achievement-progress-bar-container">
                    <div class="achievement-progress-bar" style="width: ${progress}%"></div>
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        });
        
        html += `
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading achievements:', error);
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <p class="text-muted">Error loading achievements. Please try again.</p>
        </div>
      `;
    }
  }
  
  function calculateProgress(achievement, stats) {
    const req = achievement.requirement;
    
    if (typeof req === 'number') {
      if (achievement.id.startsWith('speed_')) {
        return Math.min(100, (stats.maxWPM / req) * 100);
      }
      if (achievement.id.startsWith('acc_')) {
        return Math.min(100, (stats.maxAccuracy / req) * 100);
      }
      if (achievement.id.startsWith('tests_')) {
        return Math.min(100, (stats.totalTests / req) * 100);
      }
    }
    
    if (typeof req === 'object') {
      if (req.difficulty && req.wpm) {
        const hasMastered = stats.difficultyMastery[req.difficulty];
        return hasMastered ? 100 : 0;
      }
      if (req.wpm && req.accuracy) {
        const wpmProgress = (stats.maxWPM / req.wpm) * 50;
        const accProgress = (stats.maxAccuracy / req.accuracy) * 50;
        return Math.min(100, wpmProgress + accProgress);
      }
    }
    
    if (req === 'first_test') {
      return stats.totalTests > 0 ? 100 : 0;
    }
    
    if (req === 'all_difficulties') {
      return stats.hasMasteredAllDifficulties ? 100 : 0;
    }
    
    return 0;
  }
  // ==== LESSON HELPER FUNCTIONS ====
  
  // Generate text for lesson based on keys or word list
function generateLessonText(lesson, exerciseNum = 0) {
    if (lesson.useSentences) {
      const sentenceType = lesson.sentenceType || 'basic';
      
      const sentenceBank = {
        basic: [
          "The quick brown fox jumps over the lazy dog.",
          "Practice makes perfect when learning to type.",
          "Touch typing is an essential skill for everyone."
        ],
        commas: [
          "Today, we will learn, practice, and master typing.",
          "First, place your fingers on the home row, then begin typing.",
          "Accuracy, speed, and consistency are important skills."
        ],
        questions: [
          "What is your typing speed?",
          "Can you type without looking at the keyboard?",
          "How long have you been practicing?"
        ],
        exclamations: [
          "Great job on completing this lesson!",
          "You're making excellent progress!",
          "Keep up the fantastic work!"
        ],
        business: [
          "Dear Sir or Madam, I am writing to inquire about your services.",
          "Please find attached the quarterly report for your review.",
          "We would like to schedule a meeting at your earliest convenience."
        ],
        formal: [
          "It is with great pleasure that I extend this invitation.",
          "Kindly acknowledge receipt of this correspondence.",
          "We respectfully request your prompt attention to this matter."
        ],
        advanced: [
          "The implementation of advanced algorithms significantly improved system performance.",
          "Comprehensive analysis revealed several opportunities for optimization.",
          "Strategic planning and meticulous execution are essential for project success."
        ],
        professional: [
          "Pursuant to our previous discussion, I am forwarding the requested documentation.",
          "The board of directors has approved the proposed strategic initiative.",
          "We appreciate your continued partnership and look forward to future collaboration."
        ]
      };
      
      const sentences = sentenceBank[sentenceType] || sentenceBank.basic;
      return sentences[exerciseNum % sentences.length];
    }
    
    if (lesson.useWords && lesson.wordList) {
      const words = [];
      for (let i = 0; i < 15; i++) {
        words.push(lesson.wordList[Math.floor(Math.random() * lesson.wordList.length)]);
      }
      return words.join(' ');
    }
    
    if (lesson.text) {
      return lesson.text;
    }
    
    if (lesson.keys) {
      const chars = lesson.keys;
      let text = '';
      for (let i = 0; i < 50; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
        if (i % 3 === 2) text += ' ';
      }
      return text.trim();
    }
    
    return "practice typing exercise";
  }
  // Get lesson progress from localStorage
  function getLessonProgress(lessonId) {
    if (!currentUser) return null;
    const key = `lesson_progress_${currentUser.uid}_${lessonId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Save lesson progress
  function saveLessonProgress(lessonId, data) {
    if (!currentUser) return;
    const key = `lesson_progress_${currentUser.uid}_${lessonId}`;
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Check if lesson is unlocked
  function isLessonUnlocked(category, lessonIndex) {
    if (!currentUser) return false;
    if (lessonIndex === 0) return true; // First lesson always unlocked
    
    const lessons = LESSON_DATA[category].lessons;
    const previousLesson = lessons[lessonIndex - 1];
    const progress = getLessonProgress(previousLesson.id);
    
    return progress && progress.completed;
  }
  
 // Check if category is unlocked
  function isCategoryUnlocked(category) {
    if (!currentUser) return false;
    if (category === 'beginner') return true;
    
    if (category === 'intermediate') {
      // Check if beginner is completed
      const beginnerLessons = LESSON_DATA.beginner.lessons;
      const lastLesson = beginnerLessons[beginnerLessons.length - 1];
      const progress = getLessonProgress(lastLesson.id);
      return progress && progress.completed;
    }
    
    if (category === 'advanced') {
      // Check if intermediate is completed
      if (!LESSON_DATA.intermediate) return false;
      const intermediateLessons = LESSON_DATA.intermediate.lessons;
      const lastLesson = intermediateLessons[intermediateLessons.length - 1];
      const progress = getLessonProgress(lastLesson.id);
      return progress && progress.completed;
    }
    
    // Games and challenges unlock after advanced
    if (category === 'games' || category === 'challenges') {
      if (!LESSON_DATA.advanced) return false;
      const advancedLessons = LESSON_DATA.advanced.lessons;
      const lastLesson = advancedLessons[advancedLessons.length - 1];
      const progress = getLessonProgress(lastLesson.id);
      return progress && progress.completed;
    }
    
    return false;
  }
  
  // Calculate category progress percentage
  function getCategoryProgress(category) {
    const lessons = LESSON_DATA[category].lessons;
    let completed = 0;
    
    lessons.forEach(lesson => {
      const progress = getLessonProgress(lesson.id);
      if (progress && progress.completed) completed++;
    });
    
    return Math.round((completed / lessons.length) * 100);
  }
  // ==== COMPETITION SYSTEM ====
  
  // Generate random 6-digit competition code
  function generateCompetitionCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  // Get competition share URL
  function getCompetitionShareURL(code) {
    return `${window.location.origin}${window.location.pathname}?comp=${code}`;
  }
  
  // Format time remaining
  function formatTimeRemaining(endDate) {
    const now = new Date();
    const end = endDate.toDate ? endDate.toDate() : new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
  }
  // insert after quote-controls
  quoteControls.parentNode.insertBefore(storyControls, quoteControls.nextSibling);

  const storyChapterSelect = storyControls.querySelector('#story-chapter');
  const storyPartSelect = storyControls.querySelector('#story-part');
  const storyMetaEl = storyControls.querySelector('#story-meta');




  
 
  // ==== STATE WITH FIXED ACCURACY TRACKING ====
  let currentDifficulty = "Beginner";
  let duration = 60;
  let timeLeft = duration;
  let running = false;
  let startTime = null;
  let timerInterval = null;
  let targetText = "";
  let typed = "";
  let currentUser = null;

  let mode = 'passage';
  let currentQuoteIndex = null;
  let currentStoryIndex = 0;
  let currentStoryPart = 0;



  // ==== FUNCTION TO SHOW/HIDE ONLY LEADERBOARD AND RECENT RUNS ====
  function toggleDashboardSections(show) {
    if (recentSection) {
      recentSection.style.display = show ? 'block' : 'none';
    }
    if (leaderboardSection) {
      leaderboardSection.style.display = show ? 'block' : 'none';
    }
  }

  // ==== POPULATE DROPDOWNS ====
  function populateQuoteDropdown() {
    quoteSelect.innerHTML = `<option value="__random__">Random quote</option>`;
    QUOTES.forEach((q, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${q.quote.slice(0, 50)}${q.quote.length > 50 ? '…' : ''} — ${q.author}`;
      quoteSelect.appendChild(opt);
    });
  }
  populateQuoteDropdown();

  function populateStoryDropdown() {
    storyChapterSelect.innerHTML = '';
    STORIES.forEach((s, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = s.title;
      storyChapterSelect.appendChild(opt);
    });
    storyChapterSelect.value = currentStoryIndex;
    storyPartSelect.value = String(currentStoryPart);
    storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
  }
  populateStoryDropdown();

  // ==== AUTH FORM TABS ====
  const formTabs = document.querySelectorAll('.form-tab');
  
  formTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const mode = this.dataset.mode;
      
      formTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      if (mode === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
      }
    });
  });

  // ==== LOGIN ====
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authMessage.textContent = 'Logging in...';
    authMessage.className = 'text-center mt-4';
    try {
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-pass').value;
      await auth.signInWithEmailAndPassword(email, pass);
      authMessage.textContent = '';
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.className = 'text-center mt-4 status-error';
    }
  });

  // ==== SIGNUP ====
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authMessage.textContent = 'Creating account...';
    authMessage.className = 'text-center mt-4';
    try {
      const email = document.getElementById('signup-email').value.trim();
      const pass = document.getElementById('signup-pass').value;
      if (pass.length < 6) {
        authMessage.textContent = 'Password must be at least 6 characters.';
        authMessage.className = 'text-center mt-4 status-error';
        return;
      }
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.sendEmailVerification();
      authMessage.textContent = 'Account created. Verification email sent.';
      authMessage.className = 'text-center mt-4 status-success';
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.className = 'text-center mt-4 status-error';
    }
  });

  // ==== FORGOT PASSWORD ====
  forgotBtn.addEventListener('click', async () => {
    authMessage.className = 'text-center mt-4';
    const email = document.getElementById('login-email').value.trim();
    if (!email) {
      authMessage.textContent = 'Enter email to reset password.';
      authMessage.className = 'text-center mt-4 status-error';
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      authMessage.textContent = 'Password reset email sent.';
      authMessage.className = 'text-center mt-4 status-success';
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.className = 'text-center mt-4 status-error';
    }
  });

  // ==== LOGOUT & VERIFY ====
  logoutBtn.addEventListener('click', () => auth.signOut());
  sendVerifBtn.addEventListener('click', async () => {
    if (currentUser) {
      try {
        await currentUser.sendEmailVerification();
        alert('Verification email resent.');
      } catch (e) {
        console.warn(e);
      }
    }
  });

 // ==== DIFFICULTY / DURATION ====
diffTabs.forEach(t => {
  t.addEventListener('click', () => {
    if (mode !== 'passage') return;
    diffTabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    currentDifficulty = t.dataset.diff;
    loadNewPassage();
    if (currentUser) refreshDashboard();
    
    // Add autofocus after difficulty change
    focusTypingInput();
  });
});
 durationSelect.addEventListener('change', () => {
  duration = parseInt(durationSelect.value, 10);
  if (mode === 'passage') loadNewPassage();
  else if (mode === 'quote') loadNewQuote();
  else loadNewStory();
  if (currentUser) refreshDashboard();
  
  // Add autofocus after duration change
  focusTypingInput();
});

  // ==== MODE SWITCHING ====
modeSelect.addEventListener('change', () => {
  mode = modeSelect.value;

  if (mode === 'quote') {
    quoteControls.style.display = 'block';
    storyControls.style.display = 'none';
    diffTabs.forEach(t => t.style.display = 'none');
    loadNewQuote();
  } else if (mode === 'story') {
    quoteControls.style.display = 'none';
    storyControls.style.display = 'block';
    diffTabs.forEach(t => t.style.display = 'none');
    loadNewStory();
  } else {
    quoteControls.style.display = 'none';
    storyControls.style.display = 'none';
    diffTabs.forEach(t => t.style.display = '');
    loadNewPassage();
  }
  
  // Add autofocus after mode change
  focusTypingInput();
});

 quoteSelect.addEventListener('change', () => {
  if (mode === 'quote') {
    loadNewQuote();
    // Add autofocus after quote change
    focusTypingInput();
  }
});

 storyChapterSelect.addEventListener('change', () => {
  currentStoryIndex = parseInt(storyChapterSelect.value, 10) || 0;
  storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
  if (mode === 'story') {
    loadNewStory();
    // Add autofocus after chapter change
    focusTypingInput();
  }
});

  storyPartSelect.addEventListener('change', () => {
  currentStoryPart = parseInt(storyPartSelect.value, 10) || 0;
  storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
  if (mode === 'story') {
    loadNewStory();
    // Add autofocus after part change
    focusTypingInput();
  }
});

 // ==== TYPING EVENT LISTENERS WITH FIXED ACCURACY ====
typingInput.addEventListener('input', (e) => {
  if (!running) startTimer();
  
  const newTyped = typingInput.value;
  
  // Check if user completed a word (typed a space)
  if (newTyped.endsWith(' ')) {
    // Add the completed word to our typed string
    typed += newTyped;
    // Clear the input box for the next word
    typingInput.value = '';
    renderPassage();
    
    // Check if test is complete
    if (typed.length >= targetText.length) {
      finalizeTest();
    }
    return;
  }
  
  // For typing in progress (no space yet)
  if (newTyped.length > targetText.length - typed.length) {
    typingInput.value = newTyped.slice(0, targetText.length - typed.length);
    return;
  }
  
  renderPassage();
  
  // Check if test is complete (in case no space at end)
  if ((typed + newTyped).length >= targetText.length) {
    typed += newTyped;
    typingInput.value = '';
    finalizeTest();
  }
});

  typingInput.addEventListener('paste', e => e.preventDefault());
 retryBtn.addEventListener('click', () => {
  if (mode === 'passage') loadNewPassage();
  else if (mode === 'quote') loadNewQuote();
  else loadNewStory();
  
  // Force focus after loading new content
  focusTypingInput();
});

  // ==== GENERATORS ====
  function pickPassage() {
    const arr = WORDS[currentDifficulty];
    let text = [];
    while (text.join(' ').length < 160) {
      text = text.concat(shuffleArray(arr));
    }
    return text.slice(0, 80).join(' ');
  }
  function shuffleArray(a) { return [...a].sort(() => Math.random() - 0.5); }

  function pickQuote() {
    if (quoteSelect.value === '__random__') {
      const idx = Math.floor(Math.random() * QUOTES.length);
      currentQuoteIndex = idx;
      return QUOTES[idx];
    }
    const idx = parseInt(quoteSelect.value, 10);
    currentQuoteIndex = isNaN(idx) ? null : idx;
    return QUOTES[currentQuoteIndex];
  }

  function pickStoryText() {
    const chapter = STORIES[currentStoryIndex] || STORIES[0];
    const part = chapter.parts[currentStoryPart] || chapter.parts[0];
    return { title: chapter.title, partIndex: currentStoryPart, text: part };
  }

  // ==== LOADERS ====
function resetTestState() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = duration;
  running = false;
  startTime = null;
  typed = '';
  typingInput.value = '';
  statTime.textContent = timeLeft + 's';
  statWPM.textContent = '0';
  statAcc.textContent = '';
  typingInput.disabled = false;
  
  // Hide last test results when starting new test
  if (lastTestResults) {
    lastTestResults.classList.add('hidden');
    resultsContent.classList.add('hidden');
    resultsLoader.classList.add('hidden');
  }
  
  renderPassage();
}
// Only focus if input is enabled (not disabled after test completion)
  if (!typingInput.disabled) {
    focusTypingInput();
  }

  function loadNewPassage() {
    targetText = pickPassage();
    resetTestState();
  }

  function loadNewQuote() {
    const q = pickQuote();
    targetText = q.quote;
    // Show author info (will be hidden when user is not authenticated)
    if (quoteAuthorEl) {
      quoteAuthorEl.textContent = `— ${q.author}`;
    }
    resetTestState();
  }

  function loadNewStory() {
    const s = pickStoryText();
    targetText = s.text;
    storyMetaEl.textContent = `${s.title} — Part ${s.partIndex + 1}`;
    resetTestState();
  }

  // ==== TIMER AND STATS ====
  function startTimer() {
    if (running) return;
    running = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
      if (!running) {
        clearInterval(timerInterval);
        return;
      }
      
      timeLeft--;
      if (timeLeft <= 0) {
        timeLeft = 0;
        statTime.textContent = timeLeft + 's';
        finalizeTest();
        return;
      }
      if (typed.length >= targetText.length) {
        finalizeTest();
        return;
      }
      statTime.textContent = timeLeft + 's';
    }, 1000);
  }

function computeStats(typedStr, elapsedSec) {
  if (elapsedSec <= 0) return { wpm: 0, accuracy: 100, correct: 0, incorrect: 0 };
  
  // Count correct and incorrect characters
  let correctChars = 0;
  let incorrectChars = 0;
  
  for (let i = 0; i < typedStr.length; i++) {
    if (typedStr[i] === targetText[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }
  
  const accuracy = typedStr.length > 0 ? Math.round((correctChars / typedStr.length) * 100) : 100;
  
  // WPM calculation
  const totalCharsTyped = typedStr.length;
  const grossWPM = (totalCharsTyped / 5) / (elapsedSec / 60);
  const wpm = Math.max(0, Math.round(grossWPM));
  
  return { 
    wpm, 
    accuracy: Math.max(0, Math.min(100, accuracy)),
    correct: correctChars,
    incorrect: incorrectChars
  };
}
function renderPassage() {
  const words = targetText.split(" ");
  const currentWord = typingInput.value; // What's being typed right now
  const completedTyped = typed; // What's already been typed
  const fullTyped = completedTyped + currentWord; // Combine them
  const typedWords = fullTyped.trimEnd().split(" ");

  // Calculate current word index - it should be the word we're actively typing
  let currentWordIndex = typed.split(" ").filter(w => w !== '').length;
  
  // If we haven't typed anything yet, we're on word 0
  if (typed === '' && currentWord === '') {
    currentWordIndex = 0;
  }
    const style = window.getComputedStyle(passageDisplay);
    const containerWidth = passageDisplay.clientWidth;
    const fontSize = parseInt(style.fontSize, 10);
    const charWidth = fontSize * 0.6;
    const avgWordLength = 6;
    const WORDS_PER_ROW = Math.max(1, Math.floor(containerWidth / (avgWordLength * charWidth)));

    const ROW_SIZE = WORDS_PER_ROW;
    let pageStartIndex = 0;
    while (pageStartIndex + ROW_SIZE <= currentWordIndex && pageStartIndex + ROW_SIZE < words.length) {
      pageStartIndex += ROW_SIZE;
    }

    const visibleWords = words.slice(pageStartIndex, pageStartIndex + ROW_SIZE *2 );

    let html = "";
    for (let r = 0; r < visibleWords.length; r += WORDS_PER_ROW) {
      const rowWords = visibleWords.slice(r, r + WORDS_PER_ROW);

      const rowHtml = rowWords.map((word, wi) => {
        const absoluteIndex = pageStartIndex + r + wi;
        const typedWord = typedWords[absoluteIndex] || "";
        let chars = "";

        for (let i = 0; i < word.length; i++) {
          const typedChar = typedWord[i];

          if (typedChar === undefined) {
            chars += `<span>${escapeHtml(word[i])}</span>`;
          } else if (typedChar === word[i]) {
            chars += `<span class="correct">${escapeHtml(word[i])}</span>`;
          } else {
            chars += `<span class="incorrect">${escapeHtml(word[i])}</span>`;
          }
        }

        let wordClass = "word";
        if (absoluteIndex === currentWordIndex) {
          wordClass += " active-word";
        }

        return `<span class="${wordClass}">${chars} </span>`;
      }).join("");

      html += `<div class="row">${rowHtml}</div>`;
    }

    passageDisplay.innerHTML = html;
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  // Add this function to handle autofocus consistently
function focusTypingInput() {
  setTimeout(() => {
    if (typingInput && !typingInput.disabled) {
      typingInput.focus();
    }
  }, 100);
}

 async function finalizeTest() {
    if (!running) return;
    running = false;
    clearInterval(timerInterval);
    timerInterval = null;
    typingInput.disabled = true;
    statTime.textContent = timeLeft + 's';
    
    const elapsed = duration - timeLeft;
    const stats = computeStats(typed, elapsed);
    statWPM.textContent = stats.wpm;
    statAcc.textContent = stats.accuracy + '%';

    // Show loader in last test results
    if (lastTestResults) {
      lastTestResults.classList.remove('hidden');
      resultsLoader.classList.remove('hidden');
      resultsContent.classList.add('hidden');
    }

    const user = firebase.auth().currentUser;
    
   if (user) {
      try {
        const timestamp = firebase.firestore.Timestamp.now();
        
        // 1. Update user stats document (single document per user)
        const userStatsRef = db.collection('users').doc(user.uid);
        const userStatsDoc = await userStatsRef.get();
        
        let recentTests = [];
        let personalBests = {};
        
        if (userStatsDoc.exists) {
          const data = userStatsDoc.data();
          recentTests = data.recentTests || [];
          personalBests = data.personalBests || {};
        }
        
        // Add current test to recent tests (keep only last 20)
        const testRecord = {
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          difficulty: currentDifficulty,
          duration: duration,
          mode: mode,
          timestamp: timestamp,
          correct: stats.correct,
          incorrect: stats.incorrect
        };
        
        recentTests.unshift(testRecord); // Add to beginning
        if (recentTests.length > 20) {
          recentTests = recentTests.slice(0, 20); // Keep only last 20
        }
        
        // Update personal best for this difficulty+duration combo
        const bestKey = `${currentDifficulty}_${duration}`;
        if (!personalBests[bestKey] || stats.wpm > personalBests[bestKey].wpm) {
          personalBests[bestKey] = {
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            timestamp: timestamp
          };
        }
        
        // Update user stats document
        await userStatsRef.set({
          uid: user.uid,
          email: user.email,
          recentTests: recentTests,
          personalBests: personalBests,
          totalTests: firebase.firestore.FieldValue.increment(1),
          lastActivity: timestamp
        }, { merge: true });
        
        // 2. Only add to global leaderboard if score is top 100 worthy (70+ WPM)
        if (stats.wpm >= 70) {
          await db.collection('leaderboard').add({
            uid: user.uid,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            mode: mode,
            difficulty: currentDifficulty,
            duration: duration,
            timestamp: timestamp
          });
        }
        
        // Simulate short delay for loader effect
        await new Promise(resolve => setTimeout(resolve, 800));
        // Check for achievements
        const statsSnap = await db.collection('results')
          .where('uid', '==', currentUser.uid)
          .get();
        
        const totalTests = statsSnap.size;
        let difficultyStats = { Beginner: 0, Intermediate: 0, Advanced: 0 };
        
        statsSnap.forEach(doc => {
          const data = doc.data();
          if (data.difficulty && data.wpm >= 50) {
            difficultyStats[data.difficulty]++;
          }
        });
        
        const hasMasteredAllDifficulties = 
          difficultyStats.Beginner > 0 && 
          difficultyStats.Intermediate > 0 && 
          difficultyStats.Advanced > 0;
        
        checkAchievements({
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          difficulty: currentDifficulty,
          duration: duration,
          totalTests: totalTests,
          hasMasteredAllDifficulties: hasMasteredAllDifficulties
        });
       // Submit score to active competition if in competition mode
        const competitionMode = localStorage.getItem('competitionMode');
        const activeCompId = localStorage.getItem('activeCompetition');
        
        if (competitionMode === 'active' && activeCompId) {
          try {
            const compDoc = await db.collection('competitions').doc(activeCompId).get();
            if (compDoc.exists) {
              const comp = compDoc.data();
              
              // Check if competition is still active
              if (comp.status === 'active') {
                const leaderboard = comp.leaderboard || [];
                
                // Update or add to leaderboard
                const existingEntryIndex = leaderboard.findIndex(e => e.uid === currentUser.uid);
                
                if (existingEntryIndex >= 0) {
                  // Update if new score is better
                  if (stats.wpm > leaderboard[existingEntryIndex].wpm) {
                    leaderboard[existingEntryIndex] = {
                      uid: currentUser.uid,
                      email: currentUser.email,
                      wpm: stats.wpm,
                      accuracy: stats.accuracy,
                      submittedAt: firebase.firestore.Timestamp.now()
                    };
                    await compDoc.ref.update({ leaderboard: leaderboard });
                    
                    // Show better score notification
                    const toast = document.createElement('div');
                    toast.style.cssText = `
                      position: fixed;
                      top: 140px;
                      right: 24px;
                      background: linear-gradient(135deg, #FFD700, #FFA500);
                      color: white;
                      padding: 16px 24px;
                      border-radius: 12px;
                      z-index: 10000;
                      box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
                      font-weight: 600;
                      animation: slideIn 0.3s ease;
                    `;
                    toast.textContent = '🎉 New personal best in competition!';
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 3000);
                  } else {
                    // Score not better, but still submitted
                    const toast = document.createElement('div');
                    toast.style.cssText = `
                      position: fixed;
                      top: 140px;
                      right: 24px;
                      background: var(--accent-solid);
                      color: white;
                      padding: 16px 24px;
                      border-radius: 12px;
                      z-index: 10000;
                      box-shadow: 0 4px 16px rgba(159, 124, 255, 0.4);
                      font-weight: 600;
                      animation: slideIn 0.3s ease;
                    `;
                    toast.textContent = '📊 Score submitted to competition';
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 3000);
                  }
                } else {
                  // Add new entry
                  await compDoc.ref.update({
                    leaderboard: firebase.firestore.FieldValue.arrayUnion({
                      uid: currentUser.uid,
                      email: currentUser.email,
                      wpm: stats.wpm,
                      accuracy: stats.accuracy,
                      submittedAt: firebase.firestore.Timestamp.now()
                    })
                  });
                  
                  const toast = document.createElement('div');
                  toast.style.cssText = `
                    position: fixed;
                    top: 140px;
                    right: 24px;
                    background: linear-gradient(135deg, #51cf66, #37b24d);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    z-index: 10000;
                    box-shadow: 0 4px 16px rgba(81, 207, 102, 0.4);
                    font-weight: 600;
                    animation: slideIn 0.3s ease;
                  `;
                  toast.textContent = '🎉 First score submitted to competition!';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                }
              } else {
                // Competition ended
                localStorage.removeItem('activeCompetition');
                localStorage.removeItem('competitionMode');
                const indicator = document.getElementById('competition-indicator');
                if (indicator) indicator.remove();
                
                alert('This competition has ended. Your score was not submitted.');
              }
            } else {
              // Competition not found
              localStorage.removeItem('activeCompetition');
              localStorage.removeItem('competitionMode');
              const indicator = document.getElementById('competition-indicator');
              if (indicator) indicator.remove();
            }
            
          } catch (error) {
            console.error('Error submitting to competition:', error);
          }
        }

        // Update last test results
        lastWPMEl.textContent = stats.wpm;
        lastAccEl.textContent = stats.accuracy + '%';
        lastCorrectEl.textContent = stats.correct;
        lastIncorrectEl.textContent = stats.incorrect;
        
        // Hide loader, show results
        resultsLoader.classList.add('hidden');
        resultsContent.classList.remove('hidden');
        
        await refreshDashboard();
      } catch (e) {
        console.error('Save failed:', e);
        // Hide loader on error
        if (resultsLoader) resultsLoader.classList.add('hidden');
      }
    } else {
      // For guests, just show the results without saving
      await new Promise(resolve => setTimeout(resolve, 500));
      
      lastWPMEl.textContent = stats.wpm;
      lastAccEl.textContent = stats.accuracy + '%';
      lastCorrectEl.textContent = stats.correct;
      lastIncorrectEl.textContent = stats.incorrect;
      
      resultsLoader.classList.add('hidden');
      resultsContent.classList.remove('hidden');
    }
  
    // Keep input disabled after test completion
   
  }
 async function refreshDashboard() {
    if (!currentUser) return;
    
    // Get user stats from single document
    const userStatsDoc = await db.collection('users').doc(currentUser.uid).get();
    
    if (userStatsDoc.exists) {
      const data = userStatsDoc.data();
      const bestKey = `${currentDifficulty}_${duration}`;
      const personalBest = data.personalBests?.[bestKey];
      
      if (personalBest) {
        bestWPMEl.textContent = personalBest.wpm;
        bestAccEl.textContent = personalBest.accuracy + '%';
      } else {
        bestWPMEl.textContent = '0';
        bestAccEl.textContent = '0%';
      }
      
      // Recent tests from array
      recentTableBody.innerHTML = '';
      const recentTests = data.recentTests || [];
      recentTests.slice(0, 5).forEach(test => {
        const when = test.timestamp?.toDate ? test.timestamp.toDate().toLocaleDateString() : '—';
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${when}</td>
          <td class="font-mono">${test.wpm}</td>
          <td class="font-mono">${test.accuracy}%</td>
          <td>${test.duration}s</td>
          <td><span class="status-badge">${test.difficulty || test.mode}</span></td>
          <td>${test.mode || 'Random'}</td>
        `;
        recentTableBody.appendChild(row);
      });
    }
    
    const recentSnap = await db.collection('results')
      .where('uid','==', currentUser.uid)
      .orderBy('timestamp','desc')
      .limit(5)
      .get();
    recentTableBody.innerHTML = '';
    recentSnap.forEach(d => {
      const v = d.data();
      const when = v.timestamp?.toDate ? v.timestamp.toDate().toLocaleDateString() : '—';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${when}</td>
        <td class="font-mono">${v.wpm}</td>
        <td class="font-mono">${v.accuracy}%</td>
        <td>${v.duration}s</td>
        <td><span class="status-badge">${v.difficulty || v.mode}</span></td>
        <td>${v.mode || 'Random'}</td>
      `;
      recentTableBody.appendChild(row);
    });

    const lbSnap = await db.collection('leaderboard')
      .orderBy('wpm','desc')
      .limit(100)
      .get();
    leaderboardBody.innerHTML = '';
    let rank = 1;
    lbSnap.forEach(d => {
      const v = d.data();
      const when = v.timestamp?.toDate ? v.timestamp.toDate().toLocaleDateString() : '';
      const shortUser = v.uid ? v.uid.slice(0, 6) + '...' : 'Anonymous';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>#${rank}</strong></td>
        <td>${shortUser}</td>
        <td class="font-mono">${v.wpm}</td>
        <td class="font-mono">${v.accuracy}%</td>
        <td>${when}</td>
        <td><span class="status-badge">${v.mode || 'Random'}</span></td>
      `;
      leaderboardBody.appendChild(tr);
      rank++;
    });
  }

 // ==== AUTH STATE CHANGE ====
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
      // User is logged in
      userEmailTag.textContent = user.email;
      emailVerifStatus.innerHTML = user.emailVerified
        ? '<span class="status-success">✓ Verified</span>'
        : '<span class="status-warning">⚠ Not verified</span>';
      
      // Show leaderboard and recent runs sections when logged in
      toggleDashboardSections(true);
      
      // Update auth summary in header
      authSummary.innerHTML = `
        <div class="user-badge">${user.email}</div>
        ${user.emailVerified ? '<span class="status-success text-xs">✓</span>' : '<span class="status-warning text-xs">⚠</span>'}
      `;
      
      // Show logout and verify buttons, hide signin button
      logoutBtn.style.display = 'inline-block';
      sendVerifBtn.style.display = user.emailVerified ? 'none' : 'inline-block';
      if (document.getElementById('signin-btn')) {
        document.getElementById('signin-btn').style.display = 'none';
      }
      
      // Hide auth modal if visible
      const authModal = document.getElementById('auth-modal-overlay');
      if (authModal) {
        authModal.classList.remove('show');
      }
      
      // Enable typing and load content
      typingInput.disabled = false;
      
      // Initialize content based on current mode
      if (mode === 'quote') {
        loadNewQuote();
      } else if (mode === 'story') {
        loadNewStory();
      } else {
        loadNewPassage();
      }
      
      await refreshDashboard();
      await renderAchievements();
      
      // Ensure focus after everything loads
      setTimeout(() => {
        if (typingInput && !typingInput.disabled) {
          typingInput.focus();
        }
      }, 200);
    } else {
      // User is NOT logged in - GUEST MODE
      // Show dashboard, allow typing, but don't save results
      
      authSummary.innerHTML = '';
      userEmailTag.textContent = 'Guest Mode';
      emailVerifStatus.innerHTML = '<span class="text-muted">Sign in to save results</span>';
      
// Hide logout and verify buttons, show signin button
      logoutBtn.style.display = 'none';
      sendVerifBtn.style.display = 'none';
      
// Add sign in button to header if it doesn't exist
      let signinBtn = document.getElementById('signin-btn');
      if (!signinBtn) {
        signinBtn = document.createElement('button');
        signinBtn.id = 'signin-btn';
        signinBtn.className = 'btn btn-small';
        signinBtn.textContent = 'Sign In';
        document.querySelector('.user-info .flex').appendChild(signinBtn);
      }
      
      // Always attach the click handler
      signinBtn.onclick = function() {
        console.log('Sign in button clicked');
        window.showAuthModal();
      };
      
      signinBtn.style.display = 'inline-block';
      
      // Hide leaderboard and recent runs sections when not logged in
      toggleDashboardSections(false);
      
      // Enable typing for guests
      typingInput.disabled = false;
      
      // Initialize content for guests
      if (mode === 'quote') {
        loadNewQuote();
      } else if (mode === 'story') {
        loadNewStory();
      } else {
        loadNewPassage();
      }
      
      // Clear best stats when logged out
      bestWPMEl.textContent = '0';
      bestAccEl.textContent = '0%';
      recentTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Sign in to view your recent tests</td></tr>';
      leaderboardBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Sign in to view the leaderboard</td></tr>';
      
      // Ensure focus
      setTimeout(() => {
        if (typingInput && !typingInput.disabled) {
          typingInput.focus();
        }
      }, 200);
    }
  });
      
     

  // ==== CUSTOM TEXT FEATURE ====
  const customTextArea = document.getElementById('custom-text');
  const startCustomBtn = document.getElementById('start-custom');
  
  if (startCustomBtn && customTextArea) {
    startCustomBtn.addEventListener('click', () => {
      const customText = customTextArea.value.trim();
      if (customText.length < 10) {
        alert('Please enter at least 10 characters of text.');
        return;
      }
      
      // Switch to dashboard and set custom text
      navTabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.add('hidden'));
      document.querySelector('[data-feature="dashboard"]').classList.add('active');
      document.getElementById('section-dashboard').classList.remove('hidden');
      
      // Set the custom text as target
      targetText = customText;
      resetTestState();
    });
  }

  // ==== INITIALIZE ====
  mode = modeSelect.value || 'passage';
  
  // Always show dashboard
  toggleDashboardSections(false);
  
  // Load initial content
  if (mode === 'quote') loadNewQuote();
  else if (mode === 'story') loadNewStory();  
  else loadNewPassage();
  focusTypingInput();
  let modal = document.getElementById('auth-modal-overlay');
console.log('Modal element:', modal);
console.log('Modal display:', window.getComputedStyle(modal).display);
console.log('Modal opacity:', window.getComputedStyle(modal).opacity);
console.log('Modal z-index:', window.getComputedStyle(modal).zIndex);
console.log('Modal classes:', modal.className);
console.log('Modal inline style:', modal.style.cssText);

  console.log('SoftFingers Pro initialized with Firebase integration');
});