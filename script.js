const app = {
    threads: [
        { id: 1, title: "Modern Monetary Theory: Pros and Cons", messages: [] },
        { id: 2, title: "The Efficiency of Carbon Taxes", messages: [] },
    ],
    activeThread: null,

    // Switch to Home
    goHome: function() {
        this.activeThread = null;
        document.getElementById('home-view').style.display = 'block';
        document.getElementById('thread-view').style.display = 'none';
        this.renderThreads();
    },

    // Render the Bulletin Board
    renderThreads: function(filter = "") {
        const list = document.getElementById('thread-list');
        list.innerHTML = "";
        this.threads
            .filter(t => t.title.toLowerCase().includes(filter.toLowerCase()))
            .forEach(t => {
                const el = document.createElement('div');
                el.className = 'thread-card';
                el.innerHTML = `<strong>${t.title}</strong><br><small>${t.messages.length} messages</small>`;
                el.onclick = () => this.openThread(t.id);
                list.appendChild(el);
            });
    },

    openThread: function(id) {
        this.activeThread = this.threads.find(t => t.id === id);
        document.getElementById('home-view').style.display = 'none';
        document.getElementById('thread-view').style.display = 'block';
        document.getElementById('current-thread-title').innerText = this.activeThread.title;
        this.renderMessages();
    },

    renderMessages: function() {
        const win = document.getElementById('chat-window');
        win.innerHTML = this.activeThread.messages.map(m => `
            <div class="msg">
                <span class="msg-user">${m.user}</span>
                ${m.text}
            </div>
        `).join('');
        win.scrollTop = win.scrollHeight;
    },

    send: function() {
        const input = document.getElementById('msg-input');
        if (!input.value) return;
        this.activeThread.messages.push({
            user: "Anon" + Math.floor(Math.random() * 999),
            text: input.value
        });
        input.value = "";
        this.renderMessages();
    },

    createNewThread: function() {
        const input = document.getElementById('new-thread-title');
        if (!input.value) return;
        const newT = { id: Date.now(), title: input.value, messages: [] };
        this.threads.unshift(newT);
        input.value = "";
        this.renderThreads();
    },

    filter: function() {
        const query = document.getElementById('search-bar').value;
        this.renderThreads(query);
    }
};

// Initial load
app.renderThreads();