interface blurbFormat {
    [key: string]: JSX.Element | string
}

export function getBlurbs() {

    return {
        "coding": <>I specialize in Python and full stack web development. I like these two forms of code because Python lets me experiment with AI (which I love) and future-facing code, and the web is a form of communnication, and I beleive sharing things you create is just as important as what they do.</>,
        "school": "GPA: 3.9+ Unweighted, Second place Individual in the Central Oregon Math Contest written test (Pre-calculus section), National Merit Scholarship-qualifying PSAT score (1460), President's Education Award recipient, Cascades Academy Robotics team lead programmer. While I've had more deticated interests outside of school since I was very young, I try to keep up a good academic standing. I exel in subjects that interest me.",
        "about": "I was born in Australia in 2006, and, when I was 5 years old, moved to O'ahu, Hawai'i. I then moved to Oregon after a decade in Hawai'i. I attend a rural school called Cascades Academy in Bend, Oregon.",
    } as blurbFormat;
}