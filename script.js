const userId = "1295084921357991996";
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;
const serverInvite = "https://discord.gg/esquelesquad";

async function fetchUserData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const user = data.data;

        const avatarUrl = user.discord_user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/${user.discord_user.discriminator % 5}.png`;
        document.getElementById("avatar").src = avatarUrl;
        document.getElementById("username").textContent = `${user.discord_user.username}#${user.discord_user.discriminator}`;
        document.getElementById("activity").textContent = user.activities.length > 0 ? user.activities[0].name : "Currently doing nothing";
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("username").textContent = "Error loading profile.";
    }
}

async function fetchServerInfo() {
    try {
        const response = await fetch(`https://discord.com/api/v9/invites/esquelesquad?with_counts=true`);
        const data = await response.json();
        const server = data.guild;

        const serverIconUrl = server.icon 
            ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/0.png`;
        document.getElementById("server-icon").src = serverIconUrl;
        document.getElementById("server-name").textContent = server.name;

        const onlineCount = data.approximate_presence_count;
        const totalCount = data.approximate_member_count;
        document.getElementById("server-members").textContent = `${onlineCount} Online • ${totalCount} Members`;
    } catch (error) {
        console.error("Error fetching server info:", error);
        document.getElementById("server-name").textContent = "Error loading server.";
    }
}

function joinServer() {
    window.open(serverInvite, "_blank");
}

document.addEventListener("click", () => {
    const content = document.getElementById("content");
    const enter = document.getElementById("enter");

    if (content.style.display === "flex") return;

    enter.style.display = "none";
    content.style.display = "flex";
    setTimeout(() => {
        content.style.opacity = 1;
    }, 0);

    fetchUserData();
    fetchServerInfo();
});
