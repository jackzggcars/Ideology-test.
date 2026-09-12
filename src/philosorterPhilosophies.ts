export type Pattern = "bend" | "quarter" | "orb" | "triangle" | "bars" | "eye" | "cross" | "spiral";

export interface School {
  quote: string;
  thinker: string;
  blurb: string;
  tradition: string;
  colors: [string, string, string];
  pattern: Pattern;
}

export const philosophies: Record<string, School> = {
  // ── Metaphysics ─────────────────────────────────────────────
  Platonism: {
    quote: "The objects of geometry are eternal, and the soul that grasps them is drawn upward toward being itself.",
    thinker: "Plato",
    blurb:
      "Behind every shifting thing stands an unchanging Form. Knowledge is recollection of those perfect originals, and dialectic is the ladder that climbs to the Good.",
    tradition: "Classical idealism",
    colors: ["#f2e7cf", "#2a4f8f", "#d8b04a"],
    pattern: "orb",
  },
  Neoplatonism: {
    quote: "Withdraw into yourself and look; and if you do not yet find yourself beautiful, cut away all that is excessive.",
    thinker: "Plotinus",
    blurb:
      "All things flow from a single ineffable One, descending through Intellect and Soul into matter. The philosophical life is the return journey upward.",
    tradition: "Classical idealism",
    colors: ["#1b1636", "#c9a227", "#e6dfc8"],
    pattern: "spiral",
  },
  Aristotelianism: {
    quote: "All men by nature desire to know.",
    thinker: "Aristotle",
    blurb:
      "Reality is made of concrete substances, each with a form, a matter and an end it grows toward. Study the world as it is, and the good follows from what a thing is for.",
    tradition: "Classical realism",
    colors: ["#7a4a1e", "#e8d9b5", "#3f6b3a"],
    pattern: "triangle",
  },
  "Cartesian dualism": {
    quote: "I think, therefore I am.",
    thinker: "René Descartes",
    blurb:
      "Doubt everything until one certainty survives: the thinking self. Mind and body are two distinct substances, and clear reasoning rebuilds the world from that foundation.",
    tradition: "Modern rationalism",
    colors: ["#12213a", "#dfe6ef", "#8a1f2c"],
    pattern: "cross",
  },
  Spinozism: {
    quote: "Do not weep; do not wax indignant. Understand.",
    thinker: "Baruch Spinoza",
    blurb:
      "There is only one substance — God or Nature — unfolding by strict necessity. Freedom is not escaping that order but understanding it.",
    tradition: "Monism",
    colors: ["#0f3b3a", "#d9c98a", "#7fbfa8"],
    pattern: "orb",
  },
  "Leibnizian monadology": {
    quote: "This is the best of all possible worlds.",
    thinker: "Gottfried Wilhelm Leibniz",
    blurb:
      "Reality is a plurality of windowless mind-like simples, each mirroring the whole, harmonised in advance by a supremely rational creator.",
    tradition: "Modern rationalism",
    colors: ["#241a3f", "#e9c46a", "#c8cfe0"],
    pattern: "bars",
  },
  "Absolute idealism": {
    quote: "The rational alone is real.",
    thinker: "G. W. F. Hegel",
    blurb:
      "History is Spirit coming to know itself through contradiction and resolution. Nothing is understood in isolation; truth is the whole.",
    tradition: "German idealism",
    colors: ["#3a1f2b", "#c0a062", "#1d3557"],
    pattern: "spiral",
  },
  "Berkeleyan idealism": {
    quote: "To be is to be perceived.",
    thinker: "George Berkeley",
    blurb:
      "There is no inert matter behind our perceptions. Things exist as ideas in minds, and their constancy is owed to the perceiving of God.",
    tradition: "Immaterialism",
    colors: ["#cfe3f0", "#2c6e8f", "#f0e2c0"],
    pattern: "eye",
  },
  "Process philosophy": {
    quote: "The elucidation of immediate experience is the sole justification for any thought.",
    thinker: "Alfred North Whitehead",
    blurb:
      "There are no static things, only events becoming. Reality is a web of momentary happenings prehending one another into novelty.",
    tradition: "Metaphysics of becoming",
    colors: ["#12403f", "#7ec8a9", "#e5b769"],
    pattern: "spiral",
  },
  Atomism: {
    quote: "Nothing exists except atoms and empty space; everything else is opinion.",
    thinker: "Democritus",
    blurb:
      "The world is indivisible particles moving in the void. Colour, sweetness and value are conventions of perception laid over a mechanical reality.",
    tradition: "Ancient materialism",
    colors: ["#1b1b1b", "#bfc4c9", "#5b7a99"],
    pattern: "bars",
  },
  Materialism: {
    quote: "It is not consciousness that determines life, but life that determines consciousness.",
    thinker: "Karl Marx",
    blurb:
      "Everything real is physical, including thought. Explanation runs upward from matter and its arrangements, never downward from spirit.",
    tradition: "Naturalism",
    colors: ["#2c2c2c", "#a8323a", "#c9c2b0"],
    pattern: "bend",
  },
  "Madhyamaka Buddhism": {
    quote: "Whatever is dependently arisen, that is explained to be emptiness.",
    thinker: "Nāgārjuna",
    blurb:
      "Nothing carries its own independent essence. Things exist only in dependence on conditions, and clinging to fixed selves is the root of suffering.",
    tradition: "Eastern metaphysics",
    colors: ["#7b2d26", "#e8c15c", "#f3ead6"],
    pattern: "orb",
  },
  Taoism: {
    quote: "The Tao that can be told is not the eternal Tao.",
    thinker: "Laozi",
    blurb:
      "There is a nameless way things move. Wisdom is wu wei — effortless accord with it — and force applied against the grain always rebounds.",
    tradition: "Eastern metaphysics",
    colors: ["#0f1f1c", "#e8e2d0", "#6fa287"],
    pattern: "spiral",
  },

  // ── Epistemology ────────────────────────────────────────────
  Rationalism: {
    quote: "Nothing is in the intellect that was not first in the senses — except the intellect itself.",
    thinker: "Gottfried Wilhelm Leibniz",
    blurb:
      "Reason, not observation, delivers necessary truth. Mathematics is the model: from self-evident premises, certainty descends by deduction.",
    tradition: "Theory of knowledge",
    colors: ["#101c33", "#e4e9f2", "#c19a3c"],
    pattern: "triangle",
  },
  Empiricism: {
    quote: "No man's knowledge here can go beyond his experience.",
    thinker: "John Locke",
    blurb:
      "The mind begins blank and is written on by the senses. Every legitimate idea traces back to some impression received from the world.",
    tradition: "Theory of knowledge",
    colors: ["#2f5d3a", "#f0e6cd", "#b5813a"],
    pattern: "eye",
  },
  "Humean scepticism": {
    quote: "Reason is, and ought only to be the slave of the passions.",
    thinker: "David Hume",
    blurb:
      "We never observe causation, only one thing following another. Belief in necessity is habit, and custom — not proof — is the guide of life.",
    tradition: "Theory of knowledge",
    colors: ["#3b4a5a", "#d7cdb8", "#8f5c3c"],
    pattern: "bend",
  },
  Kantianism: {
    quote: "Thoughts without content are empty; intuitions without concepts are blind.",
    thinker: "Immanuel Kant",
    blurb:
      "The mind supplies the structure — space, time, causality — in which experience appears. We know appearances lawfully, and the thing-in-itself never.",
    tradition: "Critical philosophy",
    colors: ["#1f2e4d", "#e8e3d3", "#9aa7bd"],
    pattern: "quarter",
  },
  Pragmatism: {
    quote: "Truth happens to an idea. It becomes true, is made true by events.",
    thinker: "William James",
    blurb:
      "Judge a belief by what difference it makes in practice. Concepts are instruments for coping, revisable whenever the world pushes back.",
    tradition: "Theory of knowledge",
    colors: ["#8c4a1f", "#f2e3c2", "#3d6d7a"],
    pattern: "bars",
  },
  "Logical positivism": {
    quote: "What we cannot speak about we must pass over in silence.",
    thinker: "Ludwig Wittgenstein",
    blurb:
      "A statement means something only if experience could verify it, or if it is true by definition. Everything else is elegant noise.",
    tradition: "Analytic philosophy",
    colors: ["#e9ecef", "#1a2b45", "#c0392b"],
    pattern: "bars",
  },
  "Critical rationalism": {
    quote: "Our knowledge can only be finite, while our ignorance must necessarily be infinite.",
    thinker: "Karl Popper",
    blurb:
      "No amount of confirmation proves a theory. Science advances by bold conjectures exposed to refutation, and survives only until it fails.",
    tradition: "Analytic philosophy",
    colors: ["#12354d", "#f4f1e6", "#d1603d"],
    pattern: "triangle",
  },
  Phenomenology: {
    quote: "We must go back to the things themselves.",
    thinker: "Edmund Husserl",
    blurb:
      "Suspend theories about what lies behind experience and describe the structures of consciousness as they are actually lived.",
    tradition: "Continental philosophy",
    colors: ["#3c3a55", "#ded6c4", "#a3b8a1"],
    pattern: "eye",
  },
  "Ordinary language philosophy": {
    quote: "Philosophy is a battle against the bewitchment of our intelligence by means of language.",
    thinker: "Ludwig Wittgenstein",
    blurb:
      "Most philosophical problems are knots in how we speak. Look at how words actually work in use and the puzzle dissolves rather than gets solved.",
    tradition: "Analytic philosophy",
    colors: ["#4a4a42", "#f1ede0", "#7d9c8b"],
    pattern: "quarter",
  },
  Pyrrhonism: {
    quote: "To every argument an equal argument is opposed.",
    thinker: "Sextus Empiricus",
    blurb:
      "For every claim there is an equally strong counter-claim, so suspend judgement. Tranquility follows the surrender of dogma, not its victory.",
    tradition: "Ancient scepticism",
    colors: ["#7f8c8d", "#efece2", "#33403f"],
    pattern: "quarter",
  },
  Perspectivism: {
    quote: "There are no facts, only interpretations.",
    thinker: "Friedrich Nietzsche",
    blurb:
      "Every claim is made from somewhere, driven by a will that values before it reasons. The more perspectives, the fuller the seeing.",
    tradition: "Continental philosophy",
    colors: ["#231f20", "#c8992a", "#8c2f39"],
    pattern: "eye",
  },
  Postmodernism: {
    quote: "I define postmodern as incredulity toward metanarratives.",
    thinker: "Jean-François Lyotard",
    blurb:
      "Grand stories of progress, reason and history have lost credibility. What remains are local language games and the play of difference.",
    tradition: "Continental philosophy",
    colors: ["#1c1c22", "#e14a6c", "#4bd6c0"],
    pattern: "bend",
  },
  "Critical theory": {
    quote: "The whole is the false.",
    thinker: "Theodor Adorno",
    blurb:
      "Knowledge is never innocent of power. Theory's task is to expose the domination hidden inside culture, reason and everyday common sense.",
    tradition: "Continental philosophy",
    colors: ["#2b2118", "#b03a2e", "#d6cbb3"],
    pattern: "bend",
  },

  // ── Ethics and the good life ────────────────────────────────
  Stoicism: {
    quote: "You have power over your mind — not outside events. Realise this, and you will find strength.",
    thinker: "Marcus Aurelius",
    blurb:
      "Virtue is the only good. Sort what is up to you from what is not, accept the rest, and live according to reason and nature.",
    tradition: "Hellenistic ethics",
    colors: ["#3c4a52", "#e5ded0", "#a97c50"],
    pattern: "cross",
  },
  Epicureanism: {
    quote: "Death is nothing to us; when we exist, death is not, and when death exists, we are not.",
    thinker: "Epicurus",
    blurb:
      "Pleasure rightly understood is the absence of pain and fear. Live modestly among friends, and let physics dissolve superstition.",
    tradition: "Hellenistic ethics",
    colors: ["#5d7a3a", "#f4ecd3", "#c98f45"],
    pattern: "orb",
  },
  Cynicism: {
    quote: "I am a citizen of the world.",
    thinker: "Diogenes of Sinope",
    blurb:
      "Convention is a costume. Strip away wealth, status and shame, live in blunt accord with nature, and let the shamelessness be the argument.",
    tradition: "Hellenistic ethics",
    colors: ["#6e6152", "#d9cfbb", "#2b2b2b"],
    pattern: "bend",
  },
  "Virtue ethics": {
    quote: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
    thinker: "Aristotle (via Will Durant)",
    blurb:
      "Ask not which rule applies but what a person of good character would do. Ethics is the long cultivation of stable dispositions.",
    tradition: "Normative ethics",
    colors: ["#7d5a2b", "#f0e4c6", "#4a7050"],
    pattern: "triangle",
  },
  Confucianism: {
    quote: "Do not impose on others what you yourself do not desire.",
    thinker: "Confucius",
    blurb:
      "Character is formed in relationships — family, ritual, role. A well-ordered society grows from persons who have learned to be humane.",
    tradition: "Eastern ethics",
    colors: ["#8c1f1f", "#f0dfae", "#2f4034"],
    pattern: "cross",
  },
  Utilitarianism: {
    quote: "It is the greatest happiness of the greatest number that is the measure of right and wrong.",
    thinker: "Jeremy Bentham",
    blurb:
      "An act is right when it produces the most well-being overall. Everyone counts for one, and consequences are the only currency that matters.",
    tradition: "Normative ethics",
    colors: ["#1f6f6b", "#f2ead6", "#e0a52f"],
    pattern: "bars",
  },
  "Kantian deontology": {
    quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
    thinker: "Immanuel Kant",
    blurb:
      "Duty binds regardless of outcome. Treat persons always as ends, never merely as means, and let the moral law hold without exception.",
    tradition: "Normative ethics",
    colors: ["#22314f", "#eae5d6", "#8e9bb3"],
    pattern: "quarter",
  },
  Existentialism: {
    quote: "Man is condemned to be free.",
    thinker: "Jean-Paul Sartre",
    blurb:
      "Existence precedes essence: there is no given nature to fall back on. You are what you choose, and bad faith is pretending otherwise.",
    tradition: "Continental ethics",
    colors: ["#141414", "#e4e0d6", "#b8332e"],
    pattern: "bend",
  },
  Absurdism: {
    quote: "One must imagine Sisyphus happy.",
    thinker: "Albert Camus",
    blurb:
      "The world will not answer our demand for meaning. Neither suicide nor false hope — revolt, freedom and passion in the face of the absurd.",
    tradition: "Continental ethics",
    colors: ["#1d3557", "#f5c542", "#e8e2d2"],
    pattern: "orb",
  },
  Nihilism: {
    quote: "God is dead. God remains dead. And we have killed him.",
    thinker: "Friedrich Nietzsche",
    blurb:
      "The highest values devalue themselves; no cosmic purpose survives inspection. What follows the collapse is the only real question.",
    tradition: "Continental ethics",
    colors: ["#0a0a0a", "#5c5c5c", "#c7c2b6"],
    pattern: "orb",
  },
  "Egoism (Stirnerite)": {
    quote: "I am not nothing in the sense of emptiness, but I am the creative nothing.",
    thinker: "Max Stirner",
    blurb:
      "Every cause above the self — God, state, humanity, morality — is a spook. The unique one owns their life and joins others only in free union.",
    tradition: "Individualism",
    colors: ["#111111", "#dcdcdc", "#7a1f2b"],
    pattern: "quarter",
  },
  Objectivism: {
    quote: "The question isn't who is going to let me; it's who is going to stop me.",
    thinker: "Ayn Rand",
    blurb:
      "Reality is objective, reason is the only means of knowing it, rational self-interest is the moral purpose of life, and laissez-faire is its politics.",
    tradition: "Individualism",
    colors: ["#0e0e12", "#d4af37", "#1f6feb"],
    pattern: "triangle",
  },
  Transcendentalism: {
    quote: "Trust thyself: every heart vibrates to that iron string.",
    thinker: "Ralph Waldo Emerson",
    blurb:
      "Truth is met directly in nature and conscience, not borrowed from institutions. Self-reliance is a spiritual discipline.",
    tradition: "American philosophy",
    colors: ["#2f5237", "#f2ecd8", "#9c6b3c"],
    pattern: "spiral",
  },
  "Care ethics": {
    quote: "Caring is the very bedrock of all successful education.",
    thinker: "Nel Noddings",
    blurb:
      "Morality starts in concrete relationships and dependence, not abstract rules. Attention and responsiveness do the work principles claim to.",
    tradition: "Normative ethics",
    colors: ["#7b4b6a", "#f6e7de", "#4e7f7a"],
    pattern: "orb",
  },
  Thomism: {
    quote: "Grace does not destroy nature, but perfects it.",
    thinker: "Thomas Aquinas",
    blurb:
      "Faith and reason cannot conflict, since both come from the same source. Natural law is written into what human beings are for.",
    tradition: "Scholasticism",
    colors: ["#5d1d1d", "#efdfae", "#25406a"],
    pattern: "cross",
  },
  Augustinianism: {
    quote: "Our heart is restless until it rests in you.",
    thinker: "Augustine of Hippo",
    blurb:
      "The will is disordered before it is ignorant. Inward examination, grace and love reorder a self that reason alone cannot repair.",
    tradition: "Scholasticism",
    colors: ["#2a1c3d", "#e7d9b8", "#a3391f"],
    pattern: "cross",
  },
  Fideism: {
    quote: "Faith is precisely the contradiction between the infinite passion of inwardness and objective uncertainty.",
    thinker: "Søren Kierkegaard",
    blurb:
      "The decisive things cannot be proved. What is required is a leap made in fear and trembling by a single individual, not a syllogism.",
    tradition: "Religious existentialism",
    colors: ["#1a2430", "#d8cfbb", "#8c6b3f"],
    pattern: "triangle",
  },
  "Advaita Vedanta": {
    quote: "That thou art.",
    thinker: "Uddalaka Aruni (Chāndogya Upaniṣad)",
    blurb:
      "The self and ultimate reality are not two. The world of separate things is appearance, and liberation is recognising what was always the case.",
    tradition: "Eastern metaphysics",
    colors: ["#f4a300", "#3b1f57", "#f6efdc"],
    pattern: "spiral",
  },

  // ── Political philosophy ────────────────────────────────────
  "Classical liberalism": {
    quote: "The end of law is not to abolish or restrain, but to preserve and enlarge freedom.",
    thinker: "John Locke",
    blurb:
      "Individuals hold rights before governments exist. The state is a limited trustee, legitimate only while it protects life, liberty and property.",
    tradition: "Liberalism",
    colors: ["#1a4b8c", "#f3ecd8", "#c9a227"],
    pattern: "bars",
  },
  "Rawlsian liberalism": {
    quote: "Justice is the first virtue of social institutions.",
    thinker: "John Rawls",
    blurb:
      "Choose the rules behind a veil of ignorance, not knowing who you will be. Equal basic liberties first, and inequalities only if they help the worst off.",
    tradition: "Liberalism",
    colors: ["#2b5f75", "#f0ead9", "#9dbcc4"],
    pattern: "quarter",
  },
  "Nozickian minarchism": {
    quote: "The minimal state is the most extensive state that can be justified.",
    thinker: "Robert Nozick",
    blurb:
      "Rights are side constraints no distribution may override. A night-watchman state of courts, police and defence is the outer limit of legitimacy.",
    tradition: "Libertarianism",
    colors: ["#12233a", "#e8dcc0", "#c47b2b"],
    pattern: "triangle",
  },
  Rothbardianism: {
    quote: "The State is a gang of thieves writ large.",
    thinker: "Murray Rothbard",
    blurb:
      "Self-ownership and homesteading generate all just property. Since taxation is coercion, even the minimal state fails — law and defence go to the market.",
    tradition: "Anarcho-capitalism",
    colors: ["#0d0d0d", "#e8b830", "#5a4a1f"],
    pattern: "bend",
  },
  Hoppeanism: {
    quote: "There can be no such thing as a limited government.",
    thinker: "Hans-Hermann Hoppe",
    blurb:
      "Argumentation itself presupposes self-ownership. Democracy is treated as a decivilising auction of borrowed power; covenant communities replace it.",
    tradition: "Anarcho-capitalism",
    colors: ["#101418", "#c9a227", "#2f4858"],
    pattern: "quarter",
  },
  Georgism: {
    quote: "The equal right of all men to the use of land is as clear as their equal right to breathe the air.",
    thinker: "Henry George",
    blurb:
      "Keep what your labour makes; pay for what nature gave. A single tax on land values funds society without punishing production.",
    tradition: "Political economy",
    colors: ["#2f6b3c", "#f2e6c4", "#b8862f"],
    pattern: "bars",
  },
  Mutualism: {
    quote: "Property is theft — and property is freedom.",
    thinker: "Pierre-Joseph Proudhon",
    blurb:
      "Possession through use, credit without usury, federation instead of rule. Order emerges from voluntary contract rather than command.",
    tradition: "Anarchism",
    colors: ["#1b1b1b", "#c0392b", "#e6dfc9"],
    pattern: "bend",
  },
  Marxism: {
    quote: "The philosophers have only interpreted the world; the point is to change it.",
    thinker: "Karl Marx",
    blurb:
      "History moves through class struggle driven by how production is organised. Emancipation means abolishing the conditions that make exploitation profitable.",
    tradition: "Socialism",
    colors: ["#8c1c13", "#f0e2b6", "#3c2f2f"],
    pattern: "bars",
  },
  "Hobbesian absolutism": {
    quote: "The life of man: solitary, poor, nasty, brutish and short.",
    thinker: "Thomas Hobbes",
    blurb:
      "Without a common power, life is war of all against all. Subjects trade obedience for security, and the sovereign's authority must be undivided.",
    tradition: "Social contract",
    colors: ["#3a2c1f", "#d8c9a3", "#6e1f1f"],
    pattern: "cross",
  },
  "Civic republicanism": {
    quote: "Freedom is the absence of domination, not merely of interference.",
    thinker: "Philip Pettit",
    blurb:
      "Liberty requires citizens who cannot be arbitrarily ruled. Mixed institutions, civic virtue and public participation keep power answerable.",
    tradition: "Republicanism",
    colors: ["#5a1f2a", "#efe3c6", "#2f4f6b"],
    pattern: "cross",
  },
  Communitarianism: {
    quote: "I can only answer the question 'What am I to do?' if I can answer 'Of what story am I a part?'",
    thinker: "Alasdair MacIntyre",
    blurb:
      "The unencumbered individual of liberal theory does not exist. Identity, obligation and the good are inherited from communities and traditions.",
    tradition: "Communitarianism",
    colors: ["#4a3b22", "#e9dcbc", "#6b8f5e"],
    pattern: "triangle",
  },
  "Burkean conservatism": {
    quote: "Society is a partnership between those who are living, those who are dead, and those who are to be born.",
    thinker: "Edmund Burke",
    blurb:
      "Inherited institutions carry more wisdom than any planner's blueprint. Reform gradually, distrust abstraction, and prize continuity.",
    tradition: "Conservatism",
    colors: ["#243b2a", "#e6dcc0", "#7b5a2a"],
    pattern: "quarter",
  },
  Traditionalism: {
    quote: "Modern civilisation appears as an anomaly among all those we know.",
    thinker: "René Guénon",
    blurb:
      "A perennial sacred order underlies the great traditions, and modernity is its inversion. Restoration is metaphysical before it is political.",
    tradition: "Perennialism",
    colors: ["#1a1414", "#c9a227", "#6d2020"],
    pattern: "spiral",
  },

  // ── Theology ────────────────────────────────────────────────
  "Classical theism": {
    quote: "That than which nothing greater can be conceived.",
    thinker: "Anselm of Canterbury",
    blurb:
      "One God, simple, eternal and unchanging, is the source of everything else. Reason can reach him; revelation completes what reason begins.",
    tradition: "Theism",
    colors: ["#1b2a4a", "#e9dfc3", "#c9a227"],
    pattern: "cross",
  },
  Panentheism: {
    quote: "The world is in God, and God is more than the world.",
    thinker: "Karl Krause",
    blurb:
      "The universe lives inside the divine without exhausting it. God is neither a distant maker nor merely the sum of things, but the whole in which things happen.",
    tradition: "Theism",
    colors: ["#123a35", "#cfe3d2", "#c9a227"],
    pattern: "orb",
  },
  Pantheism: {
    quote: "God is not somewhere behind nature; nature is the face of God.",
    thinker: "Giordano Bruno",
    blurb:
      "Divinity is not separate from the cosmos — it simply is the cosmos, infinite and alive. Worship becomes attention to what already surrounds you.",
    tradition: "Theism",
    colors: ["#0d2f2a", "#8fd0b0", "#e6dfc8"],
    pattern: "spiral",
  },
  Deism: {
    quote: "The creation we behold is the true and only word of God.",
    thinker: "Thomas Paine",
    blurb:
      "A rational maker set the world running with fixed laws and no further meddling. Reverence stays; miracles and priesthoods go.",
    tradition: "Enlightenment religion",
    colors: ["#20304d", "#e8e2d0", "#b98b3a"],
    pattern: "quarter",
  },
  "Process theology": {
    quote: "God is the fellow sufferer who understands.",
    thinker: "Alfred North Whitehead",
    blurb:
      "God is not an unmoved ruler but a persuasive presence changing with the world, luring creation forward rather than coercing it.",
    tradition: "Process thought",
    colors: ["#2b3f6b", "#d8c7a0", "#7fa6c9"],
    pattern: "spiral",
  },
  "Apophatic mysticism": {
    quote: "Of the Divine, nothing can be said that is true.",
    thinker: "Pseudo-Dionysius",
    blurb:
      "Every name for God falls short, so the way forward is denial: strip away images until only silence and darkness remain, and meet him there.",
    tradition: "Mysticism",
    colors: ["#0c0c14", "#c8c2b0", "#5b4f8a"],
    pattern: "orb",
  },
  Sufism: {
    quote: "You are not a drop in the ocean; you are the ocean in a drop.",
    thinker: "Rumi",
    blurb:
      "Beyond law and doctrine lies the annihilation of the self in divine love. Practice — poetry, remembrance, discipline — polishes the heart until it reflects the One.",
    tradition: "Islamic mysticism",
    colors: ["#123a5a", "#e5c86a", "#0e8a7d"],
    pattern: "spiral",
  },
  Occasionalism: {
    quote: "There is no cause but God; fire does not burn, God burns at the fire.",
    thinker: "Al-Ghazali",
    blurb:
      "Nothing in nature has causal power of its own. What we call laws are God's habits, renewed at every instant.",
    tradition: "Islamic theology",
    colors: ["#0f2b3d", "#e0d5b8", "#b8552f"],
    pattern: "bars",
  },
  "Reformed theology": {
    quote: "The human heart is a perpetual factory of idols.",
    thinker: "John Calvin",
    blurb:
      "God is absolutely sovereign and grace is unearned. Salvation is his initiative from first to last, and the world is a theatre of his glory.",
    tradition: "Christian theology",
    colors: ["#161b21", "#dfe0d9", "#7a1f2c"],
    pattern: "cross",
  },
  "Open theism": {
    quote: "Love that cannot be refused is not love.",
    thinker: "Clark Pinnock",
    blurb:
      "God knows all that can be known, but the future of free creatures is genuinely open. History is a real relationship, not a script.",
    tradition: "Christian theology",
    colors: ["#274a6d", "#f0e7cf", "#6fae9f"],
    pattern: "quarter",
  },
  "Dvaita Vedanta": {
    quote: "The soul is eternally distinct from and dependent on the Lord.",
    thinker: "Madhva",
    blurb:
      "The self is never identical with God. Liberation is loving devotion within an unbridgeable difference, not dissolution into unity.",
    tradition: "Vedanta",
    colors: ["#3a1f4a", "#f0dca8", "#c96a2a"],
    pattern: "eye",
  },
  Jainism: {
    quote: "Reality has infinite aspects; no single view captures it.",
    thinker: "Mahavira",
    blurb:
      "Every claim is true only from a standpoint, so dogmatism is a kind of violence. Radical non-harm and self-discipline free the soul from accumulated karma.",
    tradition: "Indian philosophy",
    colors: ["#f4efe0", "#2d6a4f", "#d4a017"],
    pattern: "orb",
  },
  "Zen Buddhism": {
    quote: "If you meet the Buddha on the road, kill him.",
    thinker: "Linji",
    blurb:
      "Doctrine and argument cannot deliver awakening. Sitting, working and seeing directly into this moment can, and there is nothing else to attain.",
    tradition: "Buddhism",
    colors: ["#1c1c1c", "#efe9dc", "#8a7a5c"],
    pattern: "orb",
  },
  "Religious naturalism": {
    quote: "The universe is not only stranger than we suppose; it is holy enough.",
    thinker: "Ursula Goodenough",
    blurb:
      "No supernatural anything, yet awe, ritual and reverence remain fitting responses to a cosmos that produced us.",
    tradition: "Naturalism",
    colors: ["#1f3a2c", "#dce8cf", "#c08a3e"],
    pattern: "bend",
  },
  Agnosticism: {
    quote: "Do not pretend that conclusions are certain which are not demonstrated.",
    thinker: "T. H. Huxley",
    blurb:
      "The honest position on ultimate questions is suspended judgement. Belief and disbelief both claim more than the evidence permits.",
    tradition: "Scepticism",
    colors: ["#3a4046", "#dfe3e6", "#93a2ad"],
    pattern: "bars",
  },
  "Atheistic naturalism": {
    quote: "I had no need of that hypothesis.",
    thinker: "Pierre-Simon Laplace",
    blurb:
      "The natural order explains itself. Meaning, morality and wonder are human achievements inside a universe with no author.",
    tradition: "Naturalism",
    colors: ["#12141a", "#c8ccd2", "#4a7fb5"],
    pattern: "quarter",
  },

  // ── Aesthetics ──────────────────────────────────────────────
  Classicism: {
    quote: "A noble simplicity and a quiet grandeur.",
    thinker: "J. J. Winckelmann",
    blurb:
      "Beauty is order, proportion and restraint. The artist works within inherited rules because the rules encode what excellence actually looks like.",
    tradition: "Aesthetics",
    colors: ["#efe8d8", "#4a6273", "#c4a457"],
    pattern: "bars",
  },
  Romanticism: {
    quote: "Poetry is the spontaneous overflow of powerful feelings.",
    thinker: "William Wordsworth",
    blurb:
      "Art begins in feeling, nature and the infinite longing of the individual. The sublime matters more than the polished, genius more than the rule.",
    tradition: "Aesthetics",
    colors: ["#22304a", "#d9a441", "#8fb0c9"],
    pattern: "bend",
  },
  "Kantian aesthetics": {
    quote: "Beauty is purposiveness without purpose.",
    thinker: "Immanuel Kant",
    blurb:
      "Judging something beautiful is a disinterested pleasure we expect others to share. Taste is neither mere preference nor a matter of proof.",
    tradition: "Aesthetics",
    colors: ["#2c3550", "#e8e3d4", "#9c8bbd"],
    pattern: "quarter",
  },
  Aestheticism: {
    quote: "All art is quite useless.",
    thinker: "Oscar Wilde",
    blurb:
      "Art owes nothing to morality, politics or instruction. Its justification is the intensity of the experience it gives — art for art's sake.",
    tradition: "Aesthetics",
    colors: ["#1d1526", "#e0c36a", "#a4577c"],
    pattern: "eye",
  },
  Formalism: {
    quote: "Significant form is the one quality common to all works of visual art.",
    thinker: "Clive Bell",
    blurb:
      "What makes a work art is its arrangement of line, colour and structure — not its subject, story or the artist's biography.",
    tradition: "Aesthetics",
    colors: ["#f1f0eb", "#1f1f24", "#d0483c"],
    pattern: "bars",
  },
  Expressivism: {
    quote: "Art is the transmission of feeling the artist has experienced.",
    thinker: "Leo Tolstoy",
    blurb:
      "A work succeeds when it infects the audience with the emotion behind it. Sincerity, not technique or novelty, is the measure.",
    tradition: "Aesthetics",
    colors: ["#5a1d24", "#f0d9a8", "#2b5f6b"],
    pattern: "bend",
  },
  "Institutional theory of art": {
    quote: "A work of art is an artefact conferred the status of candidate for appreciation.",
    thinker: "George Dickie",
    blurb:
      "There is no hidden essence of art. Something is art because the artworld — galleries, critics, practices — treats it as such.",
    tradition: "Aesthetics",
    colors: ["#2a2a2e", "#e6e6e2", "#7f8fa6"],
    pattern: "quarter",
  },
  "Marxist aesthetics": {
    quote: "There is no document of civilisation which is not also a document of barbarism.",
    thinker: "Walter Benjamin",
    blurb:
      "Art is made inside material conditions and carries their politics. Criticism exposes what a work does socially, and demands that it do better.",
    tradition: "Aesthetics",
    colors: ["#6b1a1a", "#e6d8b8", "#2b2b2b"],
    pattern: "bars",
  },
  "Dionysian aesthetics": {
    quote: "Only as an aesthetic phenomenon is existence eternally justified.",
    thinker: "Friedrich Nietzsche",
    blurb:
      "Great art fuses form-giving clarity with intoxicated excess. It does not console us about life; it makes life bearable by affirming it whole.",
    tradition: "Aesthetics",
    colors: ["#1a0f14", "#c2452d", "#e8c98a"],
    pattern: "spiral",
  },
  "Wabi-sabi": {
    quote: "Nothing lasts, nothing is finished, nothing is perfect.",
    thinker: "Sen no Rikyū",
    blurb:
      "Beauty lives in the weathered, asymmetric and incomplete. The crack in the bowl is where its history and its worth show through.",
    tradition: "Japanese aesthetics",
    colors: ["#3b332a", "#d8cdb8", "#7d8a6a"],
    pattern: "orb",
  },

  // ── Further metaphysics ─────────────────────────────────────
  Panpsychism: {
    quote: "Experience goes all the way down.",
    thinker: "Galen Strawson",
    blurb:
      "Consciousness is not a late accident but a basic feature of matter. Complex minds are combinations of something already mind-like.",
    tradition: "Philosophy of mind",
    colors: ["#1d2b4a", "#8fd6d0", "#e4dcc2"],
    pattern: "orb",
  },
  "Eliminative materialism": {
    quote: "Beliefs and desires may go the way of phlogiston.",
    thinker: "Paul Churchland",
    blurb:
      "Our everyday psychology is a bad theory. A mature neuroscience will not explain beliefs and desires — it will replace them.",
    tradition: "Philosophy of mind",
    colors: ["#14161c", "#cfd6dd", "#3f8f8a"],
    pattern: "bars",
  },

  // ── Further epistemology ────────────────────────────────────
  Coherentism: {
    quote: "Beliefs face the tribunal of experience only as a corporate body.",
    thinker: "W. V. O. Quine",
    blurb:
      "Nothing is self-justifying. A belief is warranted by how well it hangs together with everything else you hold, and the whole web can be revised.",
    tradition: "Epistemology",
    colors: ["#20303a", "#dfe6e2", "#c0a15a"],
    pattern: "bend",
  },
  Reliabilism: {
    quote: "Knowledge is belief produced by a process that tends to get things right.",
    thinker: "Alvin Goldman",
    blurb:
      "You need not be able to justify yourself in argument. What matters is that the process forming the belief is dependable.",
    tradition: "Epistemology",
    colors: ["#2a3b2c", "#e2e8d8", "#8fa87c"],
    pattern: "quarter",
  },

  // ── Further ethics ──────────────────────────────────────────
  "Divine command theory": {
    quote: "The good is what God commands.",
    thinker: "William of Ockham",
    blurb:
      "Moral obligation is grounded in the will of God rather than in consequences, contracts or human flourishing alone.",
    tradition: "Religious ethics",
    colors: ["#1a2440", "#f0e8d0", "#b8933a"],
    pattern: "cross",
  },
  "Moral relativism": {
    quote: "Custom is king of all.",
    thinker: "Herodotus",
    blurb:
      "Moral codes are products of cultures and histories. There is no view from nowhere from which to rank them.",
    tradition: "Metaethics",
    colors: ["#38323f", "#e5dfd4", "#a97fa0"],
    pattern: "quarter",
  },
  Contractarianism: {
    quote: "Morality is the set of rules rational people would agree to.",
    thinker: "David Gauthier",
    blurb:
      "Ethics needs no cosmic backing. It is the mutually advantageous bargain self-interested agents would strike and then keep.",
    tradition: "Metaethics",
    colors: ["#1f3550", "#e3e7ea", "#c2a25c"],
    pattern: "bars",
  },
  "Effective altruism": {
    quote: "If it is in our power to prevent something bad, without sacrificing anything comparable, we ought to.",
    thinker: "Peter Singer",
    blurb:
      "Take the impartial demand seriously and follow the evidence: do the most good you can with what you have, whoever the beneficiaries are.",
    tradition: "Applied ethics",
    colors: ["#123d52", "#dff0f0", "#4fb3a1"],
    pattern: "orb",
  },
  "Ubuntu ethics": {
    quote: "A person is a person through other persons.",
    thinker: "Desmond Tutu",
    blurb:
      "Personhood is achieved in community. The moral task is to build and repair the relationships that make everyone more fully human.",
    tradition: "African philosophy",
    colors: ["#5a2f14", "#f0d9a0", "#2f6b4f"],
    pattern: "spiral",
  },

  // ── Further political philosophy ────────────────────────────
  Distributism: {
    quote: "Too much capitalism means too few capitalists.",
    thinker: "G. K. Chesterton",
    blurb:
      "Neither big state nor big business: property should be spread as widely as possible, with decisions made at the smallest workable scale.",
    tradition: "Political philosophy",
    colors: ["#3d4a2a", "#f0e6cc", "#8a5a2a"],
    pattern: "quarter",
  },
  Agorism: {
    quote: "Counter-economics is the practice of the free market where it is forbidden.",
    thinker: "Samuel Konkin III",
    blurb:
      "Freedom is not won at the ballot box but by building black and grey markets until the state becomes irrelevant.",
    tradition: "Libertarianism",
    colors: ["#101418", "#d8d2c0", "#c9a227"],
    pattern: "bend",
  },
  "Social democracy": {
    quote: "Markets where possible, the state where necessary.",
    thinker: "Eduard Bernstein",
    blurb:
      "Capitalism can be tamed rather than abolished: strong unions, universal services and steady reform through democratic institutions.",
    tradition: "Political philosophy",
    colors: ["#8a1f2c", "#f2e7d8", "#d8a13a"],
    pattern: "bars",
  },
  Syndicalism: {
    quote: "The workshop will replace the parliament.",
    thinker: "Georges Sorel",
    blurb:
      "Power belongs in federated unions running industry directly. The general strike, not the election, is the lever of change.",
    tradition: "Anarchism",
    colors: ["#1c1c1c", "#d02f2f", "#e6dfc8"],
    pattern: "bend",
  },
};

export const philosophyNames = Object.keys(philosophies).sort((a, b) => a.localeCompare(b));

const fallbackSchool: School = {
  quote: "The unexamined life is not worth living.",
  thinker: "Socrates",
  blurb: "This school could not be found. Try the quiz again.",
  tradition: "Unknown",
  colors: ["#2b2b33", "#c9a227", "#e6e0d0"],
  pattern: "orb",
};

/** Safe lookup: never returns undefined. */
export function getSchool(name: string): School {
  return philosophies[name] ?? fallbackSchool;
}
