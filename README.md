# Nebula

Try our [application](https://nebula.civicactions.com/) and give us feedback by opening an issue!

And our [api](https://nebulaapi.civicactions.com/) will someday be useful, but is not 
ready now.

This is our application to 18F's Agile BPA RFQ.  However, it is all freely sharable, and we aim to make a product 
truly valuable. Feel free to fork this code.

## User Manaul

Please enjoy our [User Manual](USER_MANUAL.md), which explains a possible approach to
deployment and running the automated unit tests

# Process

CivicActions has developed a functional, responsive, mobile-friendly web app using agile, lean, and human-centered design methodologies. We employed the scrum development process, which entailed two sprints lasting four days each.

## First Sprint

On the first day, we mustered a multidisciplinary team to collaborate in creating a viable MVP as quickly as possible -- four developers, a product owner, a product manager, a designer, a UX expert, a style guide designer, and a writer. Rob Read (product owner) was assigned responsibility for the project and ensured its successful outcome with all deliverables met.

In order to pinpoint user needs from the outset, we immediately scheduled an interview with an actual user who agreed to test the product, Dr. Martha Ogilvie of the University of Oklahoma Health Science Center. Prior to the interview, we had an ideation session to proactively brainstorm possible requirements and solutions, which included candidate stories and a JK exercise. Dr. Ogilvie validated our approach and helped us reprioritize our stories. Utilizing her feedback, we began work on several “spikes” to help drive out risks and uncertainty, and an MVP began to take shape.

Day Two included more story-writing, backlog grooming, and estimation -- all channeled into a Design Studio, run by our on-staff HCD expert. As expected, the stellar ideas rose to the top, and we were ready to begin work on deployment, wireframes, spiking the API, and continued progress on the MVP.  We chose Chart.js as a powerful open-source tool for conveying graphical adverse drug effect data to the user, and JQuery as a simple input tool.

Adhering to “Open First” principles, we opened our repository to the public, documenting how to install, reuse and build upon our code.  We blogged about our ideas of what 18F was looking for and added it to our repo to invite copying and edits, using social media to encourage reusing and sharing. Following the USDS Playbook checklist, we documented our accomplishments and adjusted our product according to user feedback. By this stage of our process, we had chosen a product owner and had a workable (though buggy) MVP off the ground.

On Day Three we had our second interview based on the MVP. We adjusted GUI design based on Dr. Ogilvie’s feedback, and discovered the need to normalize the data to assist busy doctors, making the product more intuitive and easy to navigate. We extended our back-end API to include this capability, and began a spike to join the data with AHRQ data to add value. We utilized Silex and Guzzle for the back-end, while using PHPUnit as a simple automated testing framework. Jenkins was used as a Continuous Integration toolkit.

On Day Four we met with Tyson Kamikawa of Harvard Medical School, who helped further tune our process through a “comparative value” exercise. We held a meeting with designated legal, security, and privacy officers, and worked on eliminating Personally Identifying Information while maintaining the functionality and usefulness of the product.

## Second Sprint

We began Day Five with a retrospective for the first sprint to ensure that we were learning and iterating along the way. Planning for the second sprint included story-writing informed by our user interviews, estimating, and prioritizing. We discussed Style Guides and decided to write a small guide for our super-simple application, copying as much from the 18F style guides as possible. Our DevOps engineer fully vetted our document deployment time, which was measured at seven minutes.

Seeking offline feedback from our external users, we published the URL to our working MVP and asked the users to return for interviews. This allowed users to review the product before the next interviews, allowing for the most effective feedback. Throughout our process, we used a limited form of the Lean UX methodology, attempting to verify each assertion with our test users.

Our Quality Assurance process uncovered a few bugs, which were quickly addressed.  One story that we identified and prioritized was to switch to “horizontal stacked bar charts”, which required a rapid change to Google Graphs as an alternative to Chart.js. Nimbly, we made the switch and found that it made for a more user-friendly way to present data.

