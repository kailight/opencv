<script lang="ts" setup>
const emailInput = ref('')
const selectedTab = ref<'devs' | 'companies'>('devs')

const handleSignUp = () => {
  console.info('Early access requested for:', emailInput.value)
}
</script>

<template lang="pug">
  .landing-page
    // 1. HERO SECTION
    header.hero
      .badge Verified Anonymous Portfolio Platform
      h1 Value First. Identity Later.
      p.subtitle
        | The open-web platform where elite engineers showcase battle-tested architecture, metrics, and professional philosophy—completely detached from bias, ageism, or employment risk.

      .cta-block
        form(@submit.prevent="handleSignUp")
          input(v-model="emailInput" type="email" placeholder="Enter your email for early access" required)
          button(type="submit") Join the Waitlist
        span.subtext Free for developers. Lifetime premium access for early backers.

    // 2. THE DUAL-SIDED SOLUTION (THE CORE CONCEPT)
    section.value-proposition
      .toggle-container
        button(:class="{ active: selectedTab === 'devs' }" @click="selectedTab = 'devs'") For Developers
        button(:class="{ active: selectedTab === 'companies' }" @click="selectedTab = 'companies'") For Businesses & HRs

      // A. DEVELOPER VALUE VIEW
      .tab-content(v-if="selectedTab === 'devs'")
        h2 Test the Market with Zero Risk.
        p.tab-intro
          | You shouldn't have to risk your current position just to see what your 20+ years of experience is worth on the open market. Build a stunning public portfolio that shields your identity until the right partner qualifies themselves.

        .grid
          .card
            h3 🛡️ Complete Employment Safety
            p Share your public profile link on X, GitHub, or blogs. Your current employer, coworkers, and platform scrapers will never know it's you until you click "Approve".
          .card
            h3 🚫 Crush Hiring Bias & Ageism
            p Force recruiters to evaluate your deep systems architecture, database optimization metrics, and philosophical disclaimers before they judge your face, name, or age.
          .card
            h3 🔑 Independent Permission Gates
            p You own the network data token. When a recruiter is impressed by your timeline, they must interactively request access to unlock your real name, portrait, and links.

      // B. BUSINESS VALUE VIEW
      .tab-content(v-if="selectedTab === 'companies'")
        h2 Skip the Noise. Hire the Impact.
        p.tab-intro
          | Stop sorting through hundreds of identical, keywords-stuffed resumes. Access a curated stream of high-autonomy, senior talent who refuse to participate in traditional corporate job-board games.

        .grid
          .card
            h3 🎯 High-Intent Engagement
            p Because developers gate their profiles, you only request access when you are genuinely aligned with their technical architecture and core engineering principles.
          .card
            h3 🧠 Structural Data Over Typo Matches
            p Review real rich-text blockquotes, complex text timelines, and architectural decisions rather than automated, flat multi-column PDF layouts optimized for bots.
          .card
            h3 🤝 True Cultural Alignment
            p Read candidate values disclaimers directly on their profile headers. Know exactly how they work, how they view ownership, and what they expect before booking an interview.

    // 3. WHY THIS PRODUCT IS ENTIRELY UNIQUE (THE MOAT)
    section.why-unique
      h2 How We Redefine Recruitment
      .moat-grid
        .moat-item
          h4 Shared on Your Terms
          p Unlike legacy closed talent marketplaces (TalentReverse/Hired), your profile isn't locked in our internal database. It is a shareable, open-web portfolio link that you control.
        .moat-item
          h4 Interactive Content Engineering
          p Built with robust modular rich-text layers. Candidates can weave code examples, deep infrastructure breakdowns, and philosophical manifestos cleanly into their layout.
        .moat-item
          h4 Automatic Data Anonymization
          p Built-in validation pipes automatically alert developers if they accidentally type recognizable corporate client names, keeping their identity bulletproof.
</template>


<style lang="stylus" scoped>
.landing-page {
  font-family: 'Montserrat', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  color: #222;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 1rem 0;
  color: #111;
}

.hero .subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  line-height: 1.6;
  color: #555;
}

.badge {
  display: inline-block;
  background-color: #e8f7f3;
  color: #228f71;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  text-transform: uppercase;
}

.cta-block form {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  max-width: 500px;
  margin: 0 auto 0.75rem auto;
}

.cta-block input {
  flex: 1;
  padding: 0.85rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.cta-block button {
  background-color: #111;
  color: #fff;
  border: 0;
  padding: 0.85rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cta-block button:hover {
  background-color: #333;
}

.cta-block .subtext {
  font-size: 0.8rem;
  color: #888;
}

/* TOGGLE TABS */
.value-proposition {
  margin: 5rem 0;
  background: #fdfdfd;
  border: 1px solid #eee;
  padding: 3rem 2rem;
  border-radius: 1rem;
}

.toggle-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.toggle-container button {
  background: none;
  border: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-bottom: 3px solid transparent;
}

.toggle-container button.active {
  color: #228f71;
  border-bottom-color: #228f71;
}

.tab-content h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tab-intro {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  color: #666;
  line-height: 1.5;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.card h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
}

/* MOAT SECTION */
.why-unique {
  text-align: center;
  margin-top: 6rem;
}

.why-unique h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.moat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  text-align: left;
}

.moat-item h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.moat-item p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}
</style>
