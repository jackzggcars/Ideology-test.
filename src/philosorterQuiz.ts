export interface Option {
  label: string;
  /** "q:<nodeId>" to continue, "r:<School name>" to finish. */
  to: string;
}

export interface QuizNode {
  question: string;
  options: Option[];
}

export const philosorterQuiz: Record<string, QuizNode> = {
  root: {
    question: "What branch of philosophy are you interested in?",
    options: [
      { label: "Metaphysics", to: "q:m1" },
      { label: "Theology", to: "q:t1" },
      { label: "Epistemology", to: "q:k1" },
      { label: "Ethics", to: "q:e1" },
      { label: "Politics", to: "q:p1" },
      { label: "Aesthetics", to: "q:a1" },
    ],
  },

  // ── Metaphysics ─────────────────────────────────────────────
  m1: {
    question: "Is the deepest reality something beyond the physical world?",
    options: [
      { label: "Yes", to: "q:m2" },
      { label: "No", to: "q:m10" },
    ],
  },
  m2: {
    question: "Is it a single unity that everything else flows from?",
    options: [
      { label: "Yes", to: "q:m3" },
      { label: "No", to: "q:m6" },
    ],
  },
  m3: {
    question: "Is your own self ultimately identical with that unity?",
    options: [
      { label: "Yes — separateness is appearance", to: "r:Advaita Vedanta" },
      { label: "No", to: "q:m4" },
    ],
  },
  m4: {
    question: "Does that unity unfold by strict necessity, without choice or purpose?",
    options: [
      { label: "Yes", to: "r:Spinozism" },
      { label: "No", to: "q:m5" },
    ],
  },
  m5: {
    question: "Does everything emanate from an ineffable source we can climb back toward?",
    options: [
      { label: "Yes, by ascent", to: "r:Neoplatonism" },
      { label: "No, by yielding to its flow", to: "r:Taoism" },
    ],
  },
  m6: {
    question: "Do perfect, unchanging Forms exist independently of any mind?",
    options: [
      { label: "Yes", to: "q:m7" },
      { label: "No", to: "q:m8" },
    ],
  },
  m7: {
    question: "Are the things around us mere shadows of those Forms?",
    options: [
      { label: "Yes", to: "r:Platonism" },
      { label: "No — form lives inside each thing", to: "r:Aristotelianism" },
    ],
  },
  m8: {
    question: "Is history the self-development of a rational Spirit?",
    options: [
      { label: "Yes", to: "r:Absolute idealism" },
      { label: "No", to: "q:m9" },
    ],
  },
  m9: {
    question: "Is reality made of countless mind-like units, each mirroring the whole?",
    options: [
      { label: "Yes", to: "r:Leibnizian monadology" },
      { label: "No", to: "q:m9b" },
    ],
  },
  m9b: {
    question: "Does anything exist while nobody perceives it?",
    options: [
      { label: "No — to be is to be perceived", to: "r:Berkeleyan idealism" },
      { label: "Yes — mind and matter are two substances", to: "r:Cartesian dualism" },
    ],
  },
  m10: {
    question: "Do things have a fixed essence of their own?",
    options: [
      { label: "Yes", to: "q:m11" },
      { label: "No", to: "q:m13" },
    ],
  },
  m11: {
    question: "Is everything, mind included, made of matter?",
    options: [
      { label: "Yes", to: "q:m12" },
      { label: "No", to: "q:m11b" },
    ],
  },
  m11b: {
    question: "Is experience a basic feature of matter itself, present all the way down?",
    options: [
      { label: "Yes", to: "r:Panpsychism" },
      { label: "No — thinking is a separate substance", to: "r:Cartesian dualism" },
    ],
  },
  m12: {
    question: "Are colour, meaning and value only conventions laid over particles in the void?",
    options: [
      { label: "Yes", to: "r:Atomism" },
      { label: "No — matter organised gives rise to the rest", to: "q:m12b" },
    ],
  },
  m12b: {
    question: "Will beliefs and desires survive a mature science of the brain?",
    options: [
      { label: "No — they will be replaced, not explained", to: "r:Eliminative materialism" },
      { label: "Yes — they are real features of physical minds", to: "r:Materialism" },
    ],
  },
  m13: {
    question: "Are there no stable things at all, only events becoming?",
    options: [
      { label: "Yes, reality is process", to: "r:Process philosophy" },
      { label: "Things exist, but only in dependence on conditions", to: "r:Madhyamaka Buddhism" },
    ],
  },

  // ── Theology ────────────────────────────────────────────────
  t1: {
    question: "Is there a divine reality at all?",
    options: [
      { label: "Yes", to: "q:t2" },
      { label: "No, or we cannot tell", to: "q:t20" },
    ],
  },
  t2: {
    question: "Is the divine personal — something that knows and wills?",
    options: [
      { label: "Yes", to: "q:t3" },
      { label: "No — it is impersonal", to: "q:t10" },
    ],
  },
  t3: {
    question: "Does God stand apart from the world as its creator?",
    options: [
      { label: "Yes", to: "q:t4" },
      { label: "No — the divine is within the world", to: "q:t8" },
    ],
  },
  t4: {
    question: "Does God still act in history, through revelation and providence?",
    options: [
      { label: "Yes", to: "q:t4b" },
      { label: "No — he set the laws and withdrew", to: "r:Deism" },
    ],
  },
  t4b: {
    question: "Is every event caused directly by God at each instant, with nature only his habit?",
    options: [
      { label: "Yes", to: "r:Occasionalism" },
      { label: "No — created things have real causal powers", to: "q:t5" },
    ],
  },
  t5: {
    question: "Can faith and reason be joined into one order?",
    options: [
      { label: "Yes", to: "q:t6" },
      { label: "No — it takes a leap", to: "r:Fideism" },
    ],
  },
  t6: {
    question: "Is that order legible in nature, as law written into what we are for?",
    options: [
      { label: "Yes", to: "r:Thomism" },
      { label: "No", to: "q:t7" },
    ],
  },
  t7: {
    question: "Is the will so wounded that only unearned grace can heal it?",
    options: [
      { label: "Yes", to: "q:t7b" },
      { label: "No", to: "q:t7c" },
    ],
  },
  t7b: {
    question: "Is God's sovereignty absolute, election included?",
    options: [
      { label: "Yes", to: "r:Reformed theology" },
      { label: "No — grace works on a restless heart", to: "r:Augustinianism" },
    ],
  },
  t7c: {
    question: "Is the good simply whatever God commands?",
    options: [
      { label: "Yes", to: "r:Divine command theory" },
      { label: "No", to: "q:t7d" },
    ],
  },
  t7d: {
    question: "Is the future of free creatures genuinely open, even to God?",
    options: [
      { label: "Yes — love cannot be scripted", to: "r:Open theism" },
      { label: "No — he is eternal and unchanging", to: "r:Classical theism" },
    ],
  },
  t8: {
    question: "Does the world exist within God without exhausting him?",
    options: [
      { label: "Yes", to: "r:Panentheism" },
      { label: "No", to: "q:t9" },
    ],
  },
  t9: {
    question: "Does God change along with the world, persuading rather than compelling?",
    options: [
      { label: "Yes", to: "r:Process theology" },
      { label: "No", to: "q:t9b" },
    ],
  },
  t9b: {
    question: "Is the path union with the Beloved through love, poetry and remembrance?",
    options: [
      { label: "Yes", to: "r:Sufism" },
      { label: "No — nature simply is the divine", to: "r:Pantheism" },
    ],
  },
  t10: {
    question: "Is your own self ultimately identical with that ultimate reality?",
    options: [
      { label: "Yes", to: "r:Advaita Vedanta" },
      { label: "No", to: "q:t11" },
    ],
  },
  t11: {
    question: "Is the soul eternally distinct and dependent, saved through devotion?",
    options: [
      { label: "Yes", to: "r:Dvaita Vedanta" },
      { label: "No", to: "q:t12" },
    ],
  },
  t12: {
    question: "Can the ultimate be described at all?",
    options: [
      { label: "No", to: "q:t12b" },
      { label: "Yes, in some way", to: "q:t13" },
    ],
  },
  t12b: {
    question: "Is the way negation and silence, or sitting past doctrine altogether?",
    options: [
      { label: "Negation and silence", to: "r:Apophatic mysticism" },
      { label: "Just sit and see directly", to: "r:Zen Buddhism" },
    ],
  },
  t13: {
    question: "Does everything emanate from a source we can climb back toward?",
    options: [
      { label: "Yes", to: "r:Neoplatonism" },
      { label: "No", to: "q:t14" },
    ],
  },
  t14: {
    question: "Is reality a flow to yield to, or infinitely many-sided?",
    options: [
      { label: "A flow to yield to", to: "r:Taoism" },
      { label: "Many-sided — so harm no one and claim nothing absolutely", to: "r:Jainism" },
    ],
  },
  t20: {
    question: "Is the honest position suspension of judgement?",
    options: [
      { label: "Yes", to: "r:Agnosticism" },
      { label: "No — there is no God", to: "q:t21" },
    ],
  },
  t21: {
    question: "Do awe, ritual and reverence still belong in a godless cosmos?",
    options: [
      { label: "Yes", to: "r:Religious naturalism" },
      { label: "No — nature explains itself and that is enough", to: "r:Atheistic naturalism" },
    ],
  },

  // ── Epistemology ────────────────────────────────────────────
  k1: {
    question: "Can we reach objective knowledge at all?",
    options: [
      { label: "Yes", to: "q:k2" },
      { label: "Only ever from some perspective", to: "q:k10" },
      { label: "No — judgement should be suspended", to: "r:Pyrrhonism" },
    ],
  },
  k2: {
    question: "Does knowledge rest ultimately on the senses?",
    options: [
      { label: "Yes", to: "q:k3" },
      { label: "No", to: "q:k7" },
    ],
  },
  k3: {
    question: "Is the mind a blank slate written on by experience?",
    options: [
      { label: "Yes", to: "q:k4" },
      { label: "No", to: "q:k6" },
    ],
  },
  k4: {
    question: "Is a claim meaningful only if experience could verify it?",
    options: [
      { label: "Yes", to: "r:Logical positivism" },
      { label: "No", to: "q:k5" },
    ],
  },
  k5: {
    question: "Is a belief true because it works when you act on it?",
    options: [
      { label: "Yes", to: "r:Pragmatism" },
      { label: "No", to: "q:k5b" },
    ],
  },
  k5b: {
    question: "Must knowledge rest on secure foundations in experience?",
    options: [
      { label: "Yes", to: "r:Empiricism" },
      { label: "No — nothing is self-justifying", to: "q:k5c" },
    ],
  },
  k5c: {
    question: "What makes a belief warranted, then?",
    options: [
      { label: "Fitting the whole web of what I believe", to: "r:Coherentism" },
      { label: "Coming from a process that tends to get things right", to: "r:Reliabilism" },
    ],
  },
  k6: {
    question: "Do we ever observe causation itself?",
    options: [
      { label: "No — only succession, and habit does the rest", to: "r:Humean scepticism" },
      { label: "Theories are guesses we can only try to refute", to: "r:Critical rationalism" },
    ],
  },
  k7: {
    question: "Does the mind impose the very structure in which experience appears?",
    options: [
      { label: "Yes — and things in themselves stay hidden", to: "r:Kantianism" },
      { label: "No", to: "q:k8" },
    ],
  },
  k8: {
    question: "Should we drop theories and describe lived experience as it presents itself?",
    options: [
      { label: "Yes", to: "r:Phenomenology" },
      { label: "No", to: "q:k9" },
    ],
  },
  k9: {
    question: "Are most philosophical problems confusions about how we use words?",
    options: [
      { label: "Yes", to: "r:Ordinary language philosophy" },
      { label: "No — reason alone reaches necessary truth", to: "r:Rationalism" },
    ],
  },
  k10: {
    question: "Have grand narratives of reason and progress lost their credibility?",
    options: [
      { label: "Yes", to: "q:k11" },
      { label: "No — but every claim serves some will", to: "r:Perspectivism" },
    ],
  },
  k11: {
    question: "Is knowledge above all an instrument of domination to be exposed?",
    options: [
      { label: "Yes", to: "r:Critical theory" },
      { label: "No — what remains is play and difference", to: "r:Postmodernism" },
    ],
  },

  // ── Ethics ──────────────────────────────────────────────────
  e1: {
    question: "Is there a given moral order you ought to conform to?",
    options: [
      { label: "Yes", to: "q:e2" },
      { label: "Yes, and it is sacred", to: "q:t5" },
      { label: "No — values must be created", to: "q:e9" },
    ],
  },
  e2: {
    question: "Does morality come down to outcomes — how much good is produced?",
    options: [
      { label: "Yes", to: "q:e2b" },
      { label: "No", to: "q:e3" },
    ],
  },
  e2b: {
    question: "Should you follow the evidence to wherever you can do the most good, impartially?",
    options: [
      { label: "Yes, rigorously", to: "r:Effective altruism" },
      { label: "No — the principle is enough", to: "r:Utilitarianism" },
    ],
  },
  e3: {
    question: "Does it come down to duties that bind whatever the consequences?",
    options: [
      { label: "Yes", to: "r:Kantian deontology" },
      { label: "No", to: "q:e4" },
    ],
  },
  e4: {
    question: "Is the point to become a certain kind of person rather than to follow rules?",
    options: [
      { label: "Yes", to: "q:e5" },
      { label: "No", to: "q:e8" },
    ],
  },
  e5: {
    question: "Is character formed above all through family, ritual and social role?",
    options: [
      { label: "Yes", to: "r:Confucianism" },
      { label: "No", to: "q:e6" },
    ],
  },
  e6: {
    question: "Should you accept whatever is outside your control and hold virtue as the only good?",
    options: [
      { label: "Yes", to: "r:Stoicism" },
      { label: "No", to: "q:e7" },
    ],
  },
  e7: {
    question: "Is a quiet life of modest pleasure among friends the highest aim?",
    options: [
      { label: "Yes", to: "r:Epicureanism" },
      { label: "No — excellence is the aim", to: "r:Virtue ethics" },
    ],
  },
  e8: {
    question: "Do moral demands arise from concrete relationships and dependence?",
    options: [
      { label: "Yes", to: "q:e8a" },
      { label: "No", to: "q:e8b" },
    ],
  },
  e8a: {
    question: "Is personhood itself something achieved through community?",
    options: [
      { label: "Yes — I am because we are", to: "r:Ubuntu ethics" },
      { label: "No — but care and attention come first", to: "r:Care ethics" },
    ],
  },
  e8b: {
    question: "Should convention be stripped away by living bare and shameless in accord with nature?",
    options: [
      { label: "Yes", to: "r:Cynicism" },
      { label: "No — trust nature, but inwardly", to: "r:Transcendentalism" },
    ],
  },
  e9: {
    question: "Do moral rules still bind because rational people would agree to them?",
    options: [
      { label: "Yes — morality is a bargain worth keeping", to: "r:Contractarianism" },
      { label: "No", to: "q:e9b" },
    ],
  },
  e9b: {
    question: "Are moral codes simply the products of particular cultures?",
    options: [
      { label: "Yes — custom is king", to: "r:Moral relativism" },
      { label: "No", to: "q:e10" },
    ],
  },
  e10: {
    question: "Once the old values collapse, does anything have value?",
    options: [
      { label: "No", to: "r:Nihilism" },
      { label: "Yes", to: "q:e11" },
    ],
  },
  e11: {
    question: "Is your own reasoned self-interest the moral purpose of your life?",
    options: [
      { label: "Yes", to: "q:e12" },
      { label: "No", to: "q:e13" },
    ],
  },
  e12: {
    question: "Is that grounded in an objective reality knowable by reason?",
    options: [
      { label: "Yes", to: "r:Objectivism" },
      { label: "No — every cause above me is a spook", to: "r:Egoism (Stirnerite)" },
    ],
  },
  e13: {
    question: "Does the world's silence call for revolt rather than despair?",
    options: [
      { label: "Yes — live it without appeal", to: "r:Absurdism" },
      { label: "No — I am my choices and answerable for them", to: "r:Existentialism" },
    ],
  },

  // ── Politics ────────────────────────────────────────────────
  p1: {
    question: "Can a state ever be legitimate?",
    options: [
      { label: "Yes", to: "q:p2" },
      { label: "No", to: "q:p10" },
    ],
  },
  p2: {
    question: "What comes first in politics?",
    options: [
      { label: "Rights that exist before any government", to: "q:p3" },
      { label: "Order and security", to: "r:Hobbesian absolutism" },
      { label: "The community that formed us", to: "q:p8" },
    ],
  },
  p3: {
    question: "Should the state do more than protect rights and enforce contracts?",
    options: [
      { label: "No", to: "q:p4" },
      { label: "Yes", to: "q:p6" },
    ],
  },
  p4: {
    question: "Should land and natural resources be the one thing taxed?",
    options: [
      { label: "Yes", to: "r:Georgism" },
      { label: "No", to: "q:p5" },
    ],
  },
  p5: {
    question: "Is the night-watchman state the outer limit of what can be justified?",
    options: [
      { label: "Yes", to: "r:Nozickian minarchism" },
      { label: "No — a limited constitutional state is fine", to: "r:Classical liberalism" },
    ],
  },
  p6: {
    question: "Are rules just only when every inequality helps the worst off?",
    options: [
      { label: "Yes", to: "r:Rawlsian liberalism" },
      { label: "No", to: "q:p6b" },
    ],
  },
  p6b: {
    question: "Can capitalism be tamed by unions and universal services rather than abolished?",
    options: [
      { label: "Yes, by steady democratic reform", to: "r:Social democracy" },
      { label: "No", to: "q:p7" },
    ],
  },
  p7: {
    question: "Is exploitation built into who owns the means of production?",
    options: [
      { label: "Yes", to: "r:Marxism" },
      { label: "No — freedom means nobody can dominate you", to: "r:Civic republicanism" },
    ],
  },
  p8: {
    question: "Is inherited tradition wiser than any reformer's blueprint?",
    options: [
      { label: "Yes", to: "q:p9" },
      { label: "No, but the unencumbered individual is a fiction", to: "q:p8b" },
    ],
  },
  p8b: {
    question: "Should property be spread as widely as possible, with decisions kept local?",
    options: [
      { label: "Yes — many small owners", to: "r:Distributism" },
      { label: "No — the shared life comes first", to: "r:Communitarianism" },
    ],
  },
  p9: {
    question: "Is modernity itself a fall away from a sacred order?",
    options: [
      { label: "Yes", to: "r:Traditionalism" },
      { label: "No — reform slowly and keep what works", to: "r:Burkean conservatism" },
    ],
  },
  p10: {
    question: "Is private property in land and capital legitimate?",
    options: [
      { label: "Yes", to: "q:p11" },
      { label: "Only possession through use", to: "q:p10b" },
    ],
  },
  p10b: {
    question: "Should industry be run by federated unions and won by the general strike?",
    options: [
      { label: "Yes", to: "r:Syndicalism" },
      { label: "No — free exchange between independent producers", to: "r:Mutualism" },
    ],
  },
  p11: {
    question: "Is democracy itself the deeper problem?",
    options: [
      { label: "Yes — covenant communities instead", to: "r:Hoppeanism" },
      { label: "No — just abolish the coercive monopoly", to: "q:p11b" },
    ],
  },
  p11b: {
    question: "How does that come about?",
    options: [
      { label: "By argument, principle and legal theory", to: "r:Rothbardianism" },
      { label: "By building markets outside the state until it withers", to: "r:Agorism" },
    ],
  },

  // ── Aesthetics ──────────────────────────────────────────────
  a1: {
    question: "Where does beauty live?",
    options: [
      { label: "In the object itself", to: "q:a2" },
      { label: "In how we respond to it", to: "q:a5" },
      { label: "In the society that makes and judges art", to: "q:a8" },
    ],
  },
  a2: {
    question: "Does beauty consist in order, proportion and restraint?",
    options: [
      { label: "Yes", to: "r:Classicism" },
      { label: "No", to: "q:a3" },
    ],
  },
  a3: {
    question: "Is it arrangement alone — line, colour, structure — that makes a work art?",
    options: [
      { label: "Yes, subject matter is irrelevant", to: "r:Formalism" },
      { label: "No", to: "q:a4" },
    ],
  },
  a4: {
    question: "Is the deepest beauty found in the weathered, asymmetric and impermanent?",
    options: [
      { label: "Yes", to: "r:Wabi-sabi" },
      { label: "No — it should overwhelm and exalt", to: "r:Romanticism" },
    ],
  },
  a5: {
    question: "Is calling something beautiful a disinterested pleasure you expect others to share?",
    options: [
      { label: "Yes", to: "r:Kantian aesthetics" },
      { label: "No", to: "q:a6" },
    ],
  },
  a6: {
    question: "Does a work succeed by transmitting the feeling the artist actually had?",
    options: [
      { label: "Yes", to: "r:Expressivism" },
      { label: "No", to: "q:a7" },
    ],
  },
  a7: {
    question: "Does art justify existence by affirming life in all its excess?",
    options: [
      { label: "Yes", to: "r:Dionysian aesthetics" },
      { label: "No", to: "q:a7b" },
    ],
  },
  a7b: {
    question: "Does art owe anything to morality or instruction?",
    options: [
      { label: "Nothing at all — art for art's sake", to: "r:Aestheticism" },
      { label: "Yes — it answers to the world it comes from", to: "r:Marxist aesthetics" },
    ],
  },
  a8: {
    question: "Is a work art simply because the artworld treats it as such?",
    options: [
      { label: "Yes", to: "r:Institutional theory of art" },
      { label: "No — art carries the politics of its conditions", to: "r:Marxist aesthetics" },
    ],
  },
};
