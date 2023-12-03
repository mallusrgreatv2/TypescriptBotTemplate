<h1>Typescript Bot Template <span style="color: #36454F; font-size: 21px;"> by mallusrgreat</span></h1>
<h2>Features</h2>
<ul>
    <li>All types of interactions supported</li>
    <li>Proper logging system and save logs into file (logs.log)</li>
    <li>Fully typed</li>
    <li>Optional MongoDB support</li>
</ul>
<p>
You'll never have to touch the interactionCreate event, ever again.
Interactions supported:
<ul>
    <li>Slash commands</li>
    <li>All types of select menus</li>
    <li>Modals</li>
    <li>Context menus</li>
    <li>Buttons</li>
</ul>
<p>
<h2>Setup</h2>
<ul style="list-style: numbers;">
    <li><code>git clone https://github.com/mallusrgreatv2/TypescriptBotTemplate.git</code></li>
    <li><code>npm install</code> or <code>yarn install</code></li>
    (Delete yarn.lock if using npm, and delete package-lock.json if using yarn.)
    <li>Copy the content of <a href="https://github.com/mallusrgreatv2/TypescriptBotTemplate/blob/master/.env.example"><code>.env.example</code></a> over to a new file called .env</li>
    <li>Change the values in .env</li>
    <li><code>npm start</code> if using npm and <code>yarn Ystart</code> if using yarn.</li>
</ul>
<h2>Rules</h2>
<ul>
    <li>For any interaction or event, name them <code>(name).(command|event|modal|menu|select|button).ts</code></li>
    <li>For disabled commands, name them <code>(name).disabled.ts</code></li>
    <li>After using tabcomplete to import Command class, add a <code>.js</code> suffix to the path.
    The path should look something like this: <code>@/Structures/Command.js</code></li>
</ul>
