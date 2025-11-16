// ==== ADMIN DASHBOARD SYSTEM ====
document.addEventListener('DOMContentLoaded', () => {
  
  // Firebase configuration
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
  
  // Admin configuration
  const ADMINS = {
    'mgodfred42@gmail.com': { role: 'super_admin', name: 'Super Admin' },
    'fullword17@gmail.com': { role: 'admin', name: 'Admin' }
  };
  
  let currentAdmin = null;
  let currentPage = 1;
  const resultsPerPage = 20;
  
  // Elements
  const adminLoading = document.getElementById('admin-loading');
  const adminAccessDenied = document.getElementById('admin-access-denied');
  const adminContent = document.getElementById('admin-content');
  const adminEmail = document.getElementById('admin-email');
  const adminRoleBadge = document.getElementById('admin-role-badge');
  const logoutBtn = document.getElementById('admin-logout-btn');
  const settingsTab = document.getElementById('settings-tab');
  
  // ==== AUTH STATE HANDLER ====
  auth.onAuthStateChanged(async (user) => {
    adminLoading.classList.remove('hidden');
    adminAccessDenied.classList.add('hidden');
    adminContent.classList.add('hidden');
    
    if (user) {
      const adminInfo = ADMINS[user.email];
      
      if (adminInfo) {
        // User is authorized admin
        currentAdmin = {
          uid: user.uid,
          email: user.email,
          role: adminInfo.role,
          name: adminInfo.name
        };
        
        adminEmail.textContent = user.email;
        
        // Show role badge
        const roleHTML = adminInfo.role === 'super_admin' 
          ? '<span class="admin-badge super-admin-badge">Super Admin</span>'
          : '<span class="admin-badge">Admin</span>';
        adminRoleBadge.innerHTML = roleHTML;
        
        // Show/hide settings tab based on role
        if (adminInfo.role === 'super_admin') {
          settingsTab.style.display = 'block';
        } else {
          settingsTab.style.display = 'none';
        }
        
        // Load admin dashboard
        adminLoading.classList.add('hidden');
        adminContent.classList.remove('hidden');
        
        // Load initial data
        await loadDashboardData();
        
      } else {
        // User is not authorized
        adminLoading.classList.add('hidden');
        adminAccessDenied.classList.remove('hidden');
      }
    } else {
      // Not signed in - redirect to login
      window.location.href = 'SoftFingers Admin-login.html';
    }
  });
  
  // ==== LOGOUT ====
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to logout?')) {
        await auth.signOut();
        window.location.href = 'SoftFingers Admin-login.html';
      }
    });
  }
  
  // ==== TAB SWITCHING ====
  const navTabs = document.querySelectorAll('.admin-nav-tab');
  const tabContents = document.querySelectorAll('.admin-tab-content');
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Update active tab
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content
      tabContents.forEach(content => {
        if (content.id === `${targetTab}-content`) {
          content.classList.add('active');
          
          // Load data for this tab
          loadTabData(targetTab);
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  
  // ==== LOAD DASHBOARD DATA ====
  async function loadDashboardData() {
    try {
      // Load overview stats
      await Promise.all([
        loadOverviewStats(),
        loadRecentActivity(),
        loadTopPerformers()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }
  
  // ==== LOAD OVERVIEW STATS ====
  async function loadOverviewStats() {
    try {
      // Get total users (count unique UIDs in results collection)
      const resultsSnap = await db.collection('results').get();
      const uniqueUsers = new Set();
      resultsSnap.forEach(doc => {
        uniqueUsers.add(doc.data().uid);
      });
      
      // Get total tests
      const totalTests = resultsSnap.size;
      
      // Get active competitions
      const competitionsSnap = await db.collection('competitions')
        .where('status', '==', 'active')
        .get();
      const activeCompetitions = competitionsSnap.size;
      
      // Calculate average WPM
      let totalWPM = 0;
      resultsSnap.forEach(doc => {
        totalWPM += doc.data().wpm || 0;
      });
      const avgWPM = totalTests > 0 ? Math.round(totalWPM / totalTests) : 0;
      
      // Update UI
      document.getElementById('total-users').textContent = uniqueUsers.size;
      document.getElementById('total-tests').textContent = totalTests.toLocaleString();
      document.getElementById('total-competitions').textContent = activeCompetitions;
      document.getElementById('avg-wpm').textContent = avgWPM;
      
    } catch (error) {
      console.error('Error loading overview stats:', error);
    }
  }
  
  // ==== LOAD RECENT ACTIVITY ====
  async function loadRecentActivity() {
    try {
      const tbody = document.getElementById('recent-activity-body');
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Loading...</td></tr>';
      
      const resultsSnap = await db.collection('results')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();
      
      if (resultsSnap.empty) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No recent activity</td></tr>';
        return;
      }
      
      let html = '';
      resultsSnap.forEach(doc => {
        const data = doc.data();
        const date = data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : 'N/A';
        const userEmail = data.uid ? data.uid.substring(0, 8) + '...' : 'Anonymous';
        
        html += `
          <tr>
            <td>${userEmail}</td>
            <td>Completed Test</td>
            <td class="text-success">${data.wpm} WPM</td>
            <td>${data.accuracy}%</td>
            <td class="text-small text-muted">${date}</td>
          </tr>
        `;
      });
      
      tbody.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading recent activity:', error);
      document.getElementById('recent-activity-body').innerHTML = 
        '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
    }
  }
  
  // ==== LOAD TOP PERFORMERS ====
  async function loadTopPerformers() {
    try {
      const tbody = document.getElementById('top-performers-body');
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Loading...</td></tr>';
      
      // Get all results from the past week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const resultsSnap = await db.collection('results')
        .where('timestamp', '>=', firebase.firestore.Timestamp.fromDate(weekAgo))
        .orderBy('timestamp', 'desc')
        .get();
      
      // Group by user and calculate stats
      const userStats = {};
      resultsSnap.forEach(doc => {
        const data = doc.data();
        const uid = data.uid;
        
        if (!userStats[uid]) {
          userStats[uid] = {
            uid: uid,
            maxWPM: 0,
            totalAccuracy: 0,
            tests: 0
          };
        }
        
        if (data.wpm > userStats[uid].maxWPM) {
          userStats[uid].maxWPM = data.wpm;
        }
        userStats[uid].totalAccuracy += data.accuracy || 0;
        userStats[uid].tests++;
      });
      
      // Convert to array and sort by WPM
      const topUsers = Object.values(userStats)
        .sort((a, b) => b.maxWPM - a.maxWPM)
        .slice(0, 10);
      
      if (topUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No data for this week</td></tr>';
        return;
      }
      
      let html = '';
      topUsers.forEach((user, index) => {
        const avgAccuracy = Math.round(user.totalAccuracy / user.tests);
        const userEmail = user.uid.substring(0, 10) + '...';
        
        html += `
          <tr>
            <td><strong>#${index + 1}</strong></td>
            <td>${userEmail}</td>
            <td class="text-success">${user.maxWPM} WPM</td>
            <td>${avgAccuracy}%</td>
            <td>${user.tests}</td>
          </tr>
        `;
      });
      
      tbody.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading top performers:', error);
      document.getElementById('top-performers-body').innerHTML = 
        '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
    }
  }
  
  // ==== LOAD TAB DATA ====
  async function loadTabData(tab) {
    switch(tab) {
      case 'overview':
        await loadDashboardData();
        break;
      case 'users':
        await loadUsers();
        break;
      case 'results':
        await loadResults();
        break;
      case 'competitions':
        await loadCompetitions();
        break;
      case 'lessons':
        await loadLessonsStats();
        break;
      case 'achievements':
        await loadAchievementsStats();
        break;
      case 'settings':
        loadSettings();
        break;
    }
  }
  
  // ==== LOAD USERS ====
  async function loadUsers() {
    try {
      const tbody = document.getElementById('users-table-body');
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Loading users...</td></tr>';
      
      // Get all results to find unique users
      const resultsSnap = await db.collection('results').get();
      const userMap = {};
      
      resultsSnap.forEach(doc => {
        const data = doc.data();
        const uid = data.uid;
        
        if (!userMap[uid]) {
          userMap[uid] = {
            uid: uid,
            tests: 0,
            maxWPM: 0,
            firstTest: data.timestamp
          };
        }
        
        userMap[uid].tests++;
        if (data.wpm > userMap[uid].maxWPM) {
          userMap[uid].maxWPM = data.wpm;
        }
        
        if (data.timestamp < userMap[uid].firstTest) {
          userMap[uid].firstTest = data.timestamp;
        }
      });
      
      const users = Object.values(userMap);
      
      if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No users found</td></tr>';
        return;
      }
      
      let html = '';
      users.forEach(user => {
        const joinDate = user.firstTest?.toDate ? user.firstTest.toDate().toLocaleDateString() : 'N/A';
        const userEmail = user.uid.substring(0, 12) + '...';
        
        html += `
          <tr>
            <td>${userEmail}</td>
            <td><span class="status-badge status-verified">✓ Active</span></td>
            <td>${user.tests}</td>
            <td class="text-success">${user.maxWPM} WPM</td>
            <td class="text-small text-muted">${joinDate}</td>
            <td>
              <button class="btn btn-small" onclick="viewUserDetails('${user.uid}')">View</button>
            </td>
          </tr>
        `;
      });
      
      tbody.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading users:', error);
      document.getElementById('users-table-body').innerHTML = 
        '<tr><td colspan="6" class="text-center text-danger">Error loading users</td></tr>';
    }
  }
  
  // ==== VIEW USER DETAILS ====
  window.viewUserDetails = async function(uid) {
    try {
      const modal = document.getElementById('user-details-modal');
      const modalBody = document.getElementById('user-details-body');
      const modalTitle = document.getElementById('user-details-title');
      
      modalTitle.textContent = 'User Details';
      modalBody.innerHTML = '<div class="text-center"><div class="loader"></div></div>';
      modal.classList.remove('hidden');
      
      // Get user's results
      const resultsSnap = await db.collection('results')
        .where('uid', '==', uid)
        .orderBy('timestamp', 'desc')
        .limit(50)
        .get();
      
      let totalTests = 0;
      let maxWPM = 0;
      let totalWPM = 0;
      let totalAccuracy = 0;
      
      resultsSnap.forEach(doc => {
        const data = doc.data();
        totalTests++;
        totalWPM += data.wpm || 0;
        totalAccuracy += data.accuracy || 0;
        if (data.wpm > maxWPM) maxWPM = data.wpm;
      });
      
      const avgWPM = totalTests > 0 ? Math.round(totalWPM / totalTests) : 0;
      const avgAccuracy = totalTests > 0 ? Math.round(totalAccuracy / totalTests) : 0;
      
      modalBody.innerHTML = `
        <div class="admin-info-grid">
          <div class="admin-info-item">
            <span class="admin-info-label">User ID</span>
            <span class="admin-info-value">${uid.substring(0, 20)}...</span>
          </div>
          <div class="admin-info-item">
            <span class="admin-info-label">Total Tests</span>
            <span class="admin-info-value">${totalTests}</span>
          </div>
          <div class="admin-info-item">
            <span class="admin-info-label">Best WPM</span>
            <span class="admin-info-value text-success">${maxWPM}</span>
          </div>
          <div class="admin-info-item">
            <span class="admin-info-label">Average WPM</span>
            <span class="admin-info-value">${avgWPM}</span>
          </div>
          <div class="admin-info-item">
            <span class="admin-info-label">Average Accuracy</span>
            <span class="admin-info-value">${avgAccuracy}%</span>
          </div>
        </div>
        
        <h4 style="margin-top: 24px; margin-bottom: 12px;">Recent Tests</h4>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${resultsSnap.docs.slice(0, 10).map(doc => {
                const data = doc.data();
                const date = data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : 'N/A';
                return `
                  <tr>
                    <td class="text-success">${data.wpm}</td>
                    <td>${data.accuracy}%</td>
                    <td>${data.difficulty || 'N/A'}</td>
                    <td class="text-small text-muted">${date}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
      
    } catch (error) {
      console.error('Error loading user details:', error);
      document.getElementById('user-details-body').innerHTML = 
        '<p class="text-center text-danger">Error loading user details</p>';
    }
  };
  
  // Close user modal
  document.getElementById('close-user-modal').addEventListener('click', () => {
    document.getElementById('user-details-modal').classList.add('hidden');
  });
  
  // ==== LOAD RESULTS ====
  async function loadResults() {
    try {
      const tbody = document.getElementById('results-table-body');
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">Loading results...</td></tr>';
      
      const resultsSnap = await db.collection('results')
        .orderBy('timestamp', 'desc')
        .limit(resultsPerPage * currentPage)
        .get();
      
      if (resultsSnap.empty) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No results found</td></tr>';
        return;
      }
      
      let html = '';
      resultsSnap.forEach(doc => {
        const data = doc.data();
        const date = data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : 'N/A';
        const userEmail = data.uid ? data.uid.substring(0, 10) + '...' : 'Anonymous';
        
        html += `
          <tr>
            <td>${userEmail}</td>
            <td class="text-success">${data.wpm}</td>
            <td>${data.accuracy}%</td>
            <td>${data.duration}s</td>
            <td>${data.difficulty || 'N/A'}</td>
            <td>${data.mode || 'Random'}</td>
            <td class="text-small text-muted">${date}</td>
            <td>
              <button class="btn btn-small btn-danger" onclick="deleteResult('${doc.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
      
      tbody.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading results:', error);
      document.getElementById('results-table-body').innerHTML = 
        '<tr><td colspan="8" class="text-center text-danger">Error loading results</td></tr>';
    }
  }
  
  // ==== DELETE RESULT ====
  window.deleteResult = async function(docId) {
    if (!confirm('Are you sure you want to delete this result? This cannot be undone.')) {
      return;
    }
    
    try {
      await db.collection('results').doc(docId).delete();
      alert('Result deleted successfully');
      await loadResults();
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Failed to delete result');
    }
  };
  
  // ==== LOAD COMPETITIONS ====
  async function loadCompetitions() {
    try {
      const tbody = document.getElementById('competitions-table-body');
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">Loading competitions...</td></tr>';
      
      const compsSnap = await db.collection('competitions')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      
      if (compsSnap.empty) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No competitions found</td></tr>';
        return;
      }
      
      let html = '';
      compsSnap.forEach(doc => {
        const data = doc.data();
        const endDate = data.endsAt?.toDate ? data.endsAt.toDate().toLocaleDateString() : 'N/A';
        const participants = data.participants ? data.participants.length : 0;
        const maxParticipants = data.maxParticipants || 10;
        
        const statusClass = data.status === 'active' ? 'status-active' : 'status-completed';
        
        html += `
          <tr>
            <td>${data.name || 'Untitled'}</td>
            <td><code>${data.code}</code></td>
            <td class="text-small">${data.creatorEmail || 'Unknown'}</td>
            <td>${participants}/${maxParticipants}</td>
            <td><span class="status-badge ${statusClass}">${data.status || 'active'}</span></td>
            <td>${data.targetWPM} WPM</td>
            <td class="text-small text-muted">${endDate}</td>
            <td>
              <button class="btn btn-small btn-danger" onclick="deleteCompetition('${doc.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
      
      tbody.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading competitions:', error);
      document.getElementById('competitions-table-body').innerHTML = 
        '<tr><td colspan="8" class="text-center text-danger">Error loading competitions</td></tr>';
    }
  }
  
  // ==== DELETE COMPETITION ====
  window.deleteCompetition = async function(docId) {
    if (!confirm('Are you sure you want to delete this competition? This cannot be undone.')) {
      return;
    }
    
    try {
      await db.collection('competitions').doc(docId).delete();
      alert('Competition deleted successfully');
      await loadCompetitions();
    } catch (error) {
      console.error('Error deleting competition:', error);
      alert('Failed to delete competition');
    }
  };
  
  // ==== LOAD LESSONS STATS ====
  async function loadLessonsStats() {
    // For now, show static data
    // In a real implementation, you'd track lesson completions in Firestore
    document.getElementById('lesson-stats-content').innerHTML = `
      <p class="text-muted">Lesson tracking data will be available when users start completing lessons.</p>
      <p class="text-small text-muted">This would require adding lesson progress to Firestore.</p>
    `;
  }
  
  // ==== LOAD ACHIEVEMENTS STATS ====
  async function loadAchievementsStats() {
    // For now, show static data
    document.getElementById('achievement-stats-content').innerHTML = `
      <p class="text-muted">Achievement tracking data will be available when users start unlocking achievements.</p>
      <p class="text-small text-muted">This would require adding achievement progress to Firestore.</p>
    `;
  }
  
  // ==== LOAD SETTINGS ====
  function loadSettings() {
    document.getElementById('last-updated').textContent = new Date().toLocaleString();
  }
  
  // ==== REFRESH BUTTONS ====
  document.getElementById('refresh-activity')?.addEventListener('click', loadRecentActivity);
  document.getElementById('refresh-competitions')?.addEventListener('click', loadCompetitions);
  
  // ==== EXPORT RESULTS ====
  document.getElementById('export-results-btn')?.addEventListener('click', async () => {
    try {
      const resultsSnap = await db.collection('results').get();
      
      let csv = 'User ID,WPM,Accuracy,Duration,Difficulty,Mode,Date\n';
      
      resultsSnap.forEach(doc => {
        const data = doc.data();
        const date = data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : 'N/A';
        csv += `${data.uid},${data.wpm},${data.accuracy},${data.duration},${data.difficulty || 'N/A'},${data.mode || 'Random'},${date}\n`;
      });
      
      // Download CSV
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `softfingers-results-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert('Results exported successfully!');
      
    } catch (error) {
      console.error('Error exporting results:', error);
      alert('Failed to export results');
    }
  });
  
  // ==== SUPER ADMIN ACTIONS ====
  document.getElementById('backup-database-btn')?.addEventListener('click', () => {
    alert('Database backup feature coming soon!\n\nThis would create a backup of all Firestore data.');
  });
  
  document.getElementById('clear-old-data-btn')?.addEventListener('click', async () => {
    if (currentAdmin.role !== 'super_admin') {
      alert('Only super admins can perform this action');
      return;
    }
    
    if (!confirm('Are you sure you want to delete all data older than 90 days? This cannot be undone!')) {
      return;
    }
    
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      
      const oldResults = await db.collection('results')
        .where('timestamp', '<', firebase.firestore.Timestamp.fromDate(ninetyDaysAgo))
        .get();
      
      const batch = db.batch();
      let count = 0;
      
      oldResults.forEach(doc => {
        batch.delete(doc.ref);
        count++;
      });
      
      if (count > 0) {
        await batch.commit();
        alert(`Successfully deleted ${count} old records`);
        await loadDashboardData();
      } else {
        alert('No old data found to delete');
      }
      
    } catch (error) {
      console.error('Error clearing old data:', error);
      alert('Failed to clear old data');
    }
  });
  
  console.log('Admin dashboard initialized');
});