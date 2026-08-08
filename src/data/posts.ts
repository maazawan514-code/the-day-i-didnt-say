import { Post } from '../types';

export const SAMPLE_POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'the-quiet-before-the-first-snow',
    title: 'The Quiet Before the First Snow',
    subtitle: 'On stillness, early morning light, and things left unsaid.',
    category: 'Poetry',
    date: '2026-01-14',
    year: 2026,
    month: 'January',
    readTime: '3 min read',
    excerpt: 'The morning arrives without fanfare, wrapped in gray linen. Outside, the pine branches hold their breath, waiting for the first white feather.',
    tags: ['Poetry', 'Winter', 'Stillness', 'Solitude'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: true,
    contentType: 'poetry',
    content: `
I.
The morning arrives without fanfare,
wrapped in gray linen and cold tallow.
Outside, the pine branches hold their breath,
waiting for the first white feather
to settle on the dark bark.

II.
There is a category of speech
that exists only in the space
between a breath taken and a breath held.
We call it silence,
as if silence were an emptiness
rather than a vessel filled to the brim.

III.
The tea cup cools against my palms.
On the table lies an open notebook,
its grid of faint blue lines
waiting for equations that do not balance,
for words that refuse to be squared.

IV.
If you listen closely to the window pane,
you can hear the temperature dropping—
a slow, mathematical descent
towards zero.
`,
    footnotes: [
      { id: 1, label: '1', text: 'Written in a small wooden cabin near the river bend during the first freeze of 2026.' }
    ]
  },
  {
    id: 'post-2',
    slug: 'letter-to-a-younger-version-of-myself',
    title: 'Letter to a Younger Version of Myself',
    subtitle: 'On patience, unhurried steps, and learning to trust the silence.',
    category: 'Letters',
    date: '2025-11-20',
    year: 2025,
    month: 'November',
    readTime: '5 min read',
    excerpt: 'You are currently obsessed with moving fast. You believe that if you do not solve the world by twenty-five, you will have wasted your turn. I am writing from the other side of that hill to tell you: slow down.',
    tags: ['Letters', 'Reflection', 'Patience', 'Youth'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: true,
    contentType: 'letter',
    letterRecipient: 'To my twenty-year-old self',
    diaryLocation: 'The Attic Study',
    content: `
Dear Twenty-Something M.,

You are currently sitting in a crowded cafe, typing feverishly on a laptop with a failing battery. You are obsessed with moving fast. You believe that if you do not publish, prove, accomplish, and categorize your life before twenty-five, you will have missed the train.

I am writing to you from a quiet desk, fifteen years later, beside a cooling cup of green tea.

Here is what I wish I could hand you across the table:

1. The speed you are chasing is a false metric. The best ideas—the ones that will actually sustain your soul—grow at the rate of oak trees, not bamboo.
2. It is completely okay not to have a answer for every question asked of you in a seminar or a dinner party. "I don't know yet" is one of the most honest sentences in human language.
3. Keep writing by hand. The physical friction of pen on paper forces your brain to slow down to the speed of true reflection.
4. Do not apologize for loving mathematics alongside poetry. The world will try to force you into a box (the technical vs. the emotional), but the universe itself is written in geometry and song.

Take a deep breath. Walk home by the longer path tonight.

Yours in patience,
M.
`,
    footnotes: [
      { id: 1, label: '1', text: 'Reflecting on an entry from my old red notebook dated autumn 2011.' }
    ]
  },
  {
    id: 'post-3',
    slug: 'on-the-geometry-of-unspoken-words-and-eulers-identity',
    title: "On the Geometry of Unspoken Words & Euler's Identity",
    subtitle: 'Connecting complex numbers, emotional resonance, and mathematical harmony.',
    category: 'Essays',
    date: '2025-09-08',
    year: 2025,
    month: 'September',
    readTime: '7 min read',
    excerpt: 'Euler’s Identity combines five of the most fundamental constants in mathematics into a single, breathtaking equation. Why does it evoke the exact same feeling as reading a masterfully written line of verse?',
    tags: ['Essays', 'Philosophy', 'Euler', 'Elegance'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: true,
    contentType: 'mathematics',
    mathFormulas: [
      {
        label: "Euler's Identity",
        latex: "e^{i\\pi} + 1 = 0",
        explanation: "Combines e (growth), i (imaginary unit), π (geometry/circle), 1 (unity), and 0 (emptiness) in one line."
      },
      {
        label: "Euler's Formula in Complex Plane",
        latex: "e^{i\\theta} = \\cos(\\theta) + i\\sin(\\theta)",
        explanation: "Tracing a rotation along the unit circle in the complex plane as angle θ varies."
      },
      {
        label: "Definite Integral of Gaussian Curve",
        latex: "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}",
        explanation: "The unexpected appearance of the circular constant π under the bell curve of natural distribution."
      }
    ],
    content: `
In my advanced calculus seminar yesterday, a student paused after I wrote Euler's identity on the blackboard:

$$e^{i\\pi} + 1 = 0$$

She looked at it for a long moment, tapped her pencil, and whispered: *"It feels like a riddle that solved itself without asking for help."*

She was right. Look at the five actors on this tiny stage:
- **$e$**: The base of natural logarithms—the constant of continuous growth.
- **$i$**: The imaginary unit, defined by $i^2 = -1$—the dimension perpendicular to standard reality.
- **$\\pi$**: The ratio of a circle's circumference to its diameter—the eternal geometry of loops.
- **1**: The unit of counting, the beginning of all positive quantity.
- **0**: The void, the baseline of balance.

When you evaluate $e^{i\\theta}$ for $\\theta = \\pi$:

$$e^{i\\pi} = \\cos(\\pi) + i\\sin(\\pi) = -1 + i(0) = -1$$

Rearranging yields $e^{i\\pi} + 1 = 0$.

Why does this feel poetic? Because, like the best poetry, it condenses immense structural depth into an impossibly minimal container. It shows that concepts that seem completely disparate on the surface—growth, rotation, counting, and nothingness—are deeply woven into the exact same fabric underneath.
`,
    footnotes: [
      { id: 1, label: '1', text: 'Euler first published this relationship in his treatise Introductio in analysin infinitorum (1748).' }
    ],
    toc: [
      { id: 'sec-1', title: 'The Five Actors on Stage', level: 2 },
      { id: 'sec-2', title: 'Complex Rotations & Geometry', level: 2 },
      { id: 'sec-3', title: 'Mathematical Poetry', level: 2 }
    ]
  },
  {
    id: 'post-4',
    slug: 'classroom-notes-what-children-teach-us-about-silence',
    title: 'Classroom Notes: What Children Teach Us About Silence',
    subtitle: 'Observations on waiting ten seconds before answering a hand in the air.',
    category: 'Reflections',
    date: '2025-06-12',
    year: 2025,
    month: 'June',
    readTime: '4 min read',
    excerpt: 'In modern pedagogy, there is an obsession with immediate response time. But when you give a student seven full seconds of quiet before inviting an answer, something magical happens.',
    tags: ['Reflections', 'Silence', 'Notes'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: false,
    contentType: 'teaching',
    content: `
During third period math, I asked the class: *"If a prime number is only divisible by one and itself, why isn't 1 considered a prime number?"*

Usually, three hands shoot up within half a second. They are the fast thinkers, the ones trained to react quickly to stimuli.

Yesterday, I did something different. I held up my palm and said: *"No hands for ten seconds. Just look at the board and think in quiet."*

The room went dead silent. You could hear the ticking of the clock near the door, the distant hum of rain against the window glass.

During those ten seconds:
- Maya, who usually stays quiet in the back row, lowered her head, drew two circles on her scratch paper, and blinked.
- Leo stopped fidgeting with his eraser.
- The rush to "be first" evaporated, replaced by genuine contemplation.

When the ten seconds expired and I invited answers, Maya raised her hand. Her explanation—that including 1 would destroy the uniqueness of prime factorization—was clearer and more insightful than any quick answer I've received all term.

Speed is a metric for machines. Depth is a quality of humans.
`,
    footnotes: [
      { id: 1, label: '1', text: 'The Fundamental Theorem of Arithmetic states every integer > 1 has a unique prime factorization. If 1 were prime, 6 could be 2×3, or 1×2×3, or 1×1×2×3 infinitely.' }
    ]
  },
  {
    id: 'post-5',
    slug: 'august-4th-rain-on-the-tin-roof',
    title: 'August 4th: Rain on the Tin Roof',
    subtitle: 'A diary entry written beside an open window with cold Earl Grey.',
    category: 'Journal',
    date: '2025-08-04',
    year: 2025,
    month: 'August',
    readTime: '3 min read',
    excerpt: 'The rain began at 4:30 AM. A drumming rhythm on the metal awning. I sat with a notebook, watching the water channel down the glass like miniature rivers.',
    tags: ['Journal', 'Diary', 'Rain', 'Morning Notes'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: false,
    contentType: 'journal',
    diaryLocation: 'Oak Street Porch',
    content: `
4:45 AM.

The house is sleeping. The rain has been falling steadily for an hour now—a soft, persistent drumming against the tin awning outside my study window.

I made a cup of Earl Grey tea. Forgot to drink it while it was piping hot, so now it sits beside me warm and dark, reflecting the small yellow glow of my desk lamp.

I opened my notebook to a blank page. For ten minutes, I wrote nothing. Just listened.

There is a peace in knowing that out there, millions of raindrops are falling without anyone directing them. They don't need a project manager. They don't need a deadline. They just obey gravity and nourish the soil.

I wrote down three words:
- *Resonance.*
- *Patience.*
- *Return.*

Tomorrow the school term planning begins again. But for this hour, the world belongs entirely to rain and cold tea.
`,
  },
  {
    id: 'post-6',
    slug: 'thinking-without-a-banister-a-note-on-solitude',
    title: 'Thinking Without a Banister: A Note on Solitude',
    subtitle: 'Reflections on Hannah Arendt, dogmas, and the courage to think freely.',
    category: 'Reflections',
    date: '2025-04-18',
    year: 2025,
    month: 'April',
    readTime: '6 min read',
    excerpt: 'Hannah Arendt famously described genuine thinking as "Denken ohne Geländer"—thinking without a banister. When we let go of pre-fabricated ideological handrails, what remains?',
    tags: ['Reflections', 'Philosophy', 'Arendt', 'Solitude', 'Independent Thought'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: false,
    contentType: 'reflections',
    content: `
Hannah Arendt once remarked in a 1964 interview that true political and philosophical reflection requires *"Denken ohne Geländer"*—thinking without a banister.

When you walk down a steep flight of stairs, a banister offers reassurance. You can lean on it, lean into it, trust that if your balance slips, the handrail will catch your weight.

In culture and intellectual life, banisters take many forms:
- Ideological doctrines
- Pre-approved party lines
- Algorithmic consensus
- Academic jargon designed to signal belonging

When you strip away those banisters, you are forced to climb down the mountain on your own two feet. It feels terrifying at first. You might slip. You might hesitate.

Yet Arendt insisted that this vulnerable state—the two-in-one dialogue of the soul with itself in solitude—is the only defense against thoughtlessness.

When we spend all day scrolling through pre-packaged opinions, we are swimming in banisters. We never test our own internal balance.

This blog exists off to the side of that digital highway precisely to practice building a space where one can think slowly, without a handrail in sight.
`,
    footnotes: [
      { id: 1, label: '1', text: 'Hannah Arendt, Essays in Understanding: 1930–1954 (Schocken Books, 1994).' }
    ]
  },
  {
    id: 'post-7',
    slug: 'the-archimedean-point',
    title: 'The Archimedean Point',
    subtitle: 'Give me a place to stand, and I will move the earth.',
    category: 'Poetry',
    date: '2025-02-10',
    year: 2025,
    month: 'February',
    readTime: '2 min read',
    excerpt: 'Give me a fulcrum made of walnut wood, a lever carved from bone. I do not wish to move the world—only to lift this single moment.',
    tags: ['Poetry', 'Archimedes', 'Minimalism'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: false,
    contentType: 'poetry',
    content: `
Give me a fulcrum
carved from seasoned walnut wood,
a lever fashioned from patience.

I do not wish to move the earth,
nor tilt the axis of the stars.

I only wish to hold
this single quiet afternoon
one millimeter above
the noise of the valley below.
`
  },
  {
    id: 'post-8',
    slug: 'to-a-student-who-stopped-asking-questions',
    title: 'To a Student Who Stopped Asking Questions',
    subtitle: 'A letter on why wrong answers are the truest doorway to understanding.',
    category: 'Letters',
    date: '2025-01-05',
    year: 2025,
    month: 'January',
    readTime: '4 min read',
    excerpt: 'I noticed you stopped raising your hand after the quiz last Thursday. You folded your paper three times and slipped it into your bag. I want to tell you why your mistake on problem 4 was my favorite moment of the lesson.',
    tags: ['Letters', 'Encouragement'],
    author: {
      name: 'M.',
      role: '',
    },
    featured: false,
    contentType: 'letter',
    letterRecipient: 'To S., in Row 3',
    content: `
Dear S.,

I noticed you stopped raising your hand after the midterm quiz last Thursday. When I handed back the papers, you folded yours three times and slipped it into the deepest pocket of your bag.

I am writing this letter because I want to tell you something that the grading rubric never says:

Your mistake on Problem #4 was my favorite moment in class all month.

Why? Because you didn't make a careless arithmetic mistake. You made a *profound* structural mistake. You assumed that the function was linear because it looked smooth on the interval $[0, 5]$. That assumption showed you were looking for patterns! It showed your mind was actively trying to synthesize, rather than just memorize a formula like a robot.

In mathematics—and in life—the person who makes an interesting, thoughtful mistake is ten steps closer to mastery than the person who memorizes steps without understanding why they work.

Please raise your hand again tomorrow. We need your questions.

Warmly,
Your Teacher
`
  }
];
