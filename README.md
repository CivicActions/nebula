# Pool Three
## Prototype Development Process

Try our [application](https://www.sideeffect.io/) or [build it yourself](https://github.com/CivicActions/nebula/blob/master/DEVOPS_MANUAL.md).

We used agile, lean, and human-centered design methodologies to develop our Agile Delivery Services (ADS) I prototype and create a functional, responsive, mobile-friendly web-based application. We used a SCRUM development process that consisted of the following two sprints:


## First Sprint


On the first day, we mustered a multidisciplinary MVP team that consisted of four developers, a product owner, a product manager, a designer, a UX expert, a style guide designer, and a writer. Our product owner, Rob Read, was responsible for ensuring project success and satisfying deliverable requirements.


In order to pinpoint user needs from the outset, we immediately scheduled an interview with an actual user, Dr. Martha Ogilvie of NIH, who agreed to test the product. Prior to the interview, we conducted an ideation session to proactively brainstorm possible requirements and solutions, which included candidate stories and a prioritization exercise. Dr. Ogilvie validated our approach and helped us reprioritize our stories. Utilizing her feedback, we worked on several “spikes” to identify risks and uncertainties. From there, an MVP began to take shape.


During Day Two, we dove deeper into story-writing, backlog grooming, and estimation -- all channeled into a Design Studio, run by our on-staff HCD expert. As expected, the stellar ideas rose to the top. Using these, we began working on MVP deployment, wireframes, and spiking the API. We decided to utilize Chart.js as a powerful open-source tool to convey graphical adverse drug effect data to the user, and JQuery as a simple input tool.


Adhering to “Open First” principles, we opened our repository to the public, explaining how to install, reuse and build upon our code.  We blogged about our perception of 18F’s needs and goals, encouraging edits from the public by adding this to our repo and inviting our audience to share via social media. Following the USDS Playbook checklist, we documented our accomplishments and adjusted our product according to user feedback. By this stage of our process, we had a workable MVP to improve upon.


On Day Three we held our second interview with Dr. Ogilvie to discuss the MVP. We adjusted our Graphical User Interface (GUI) design based on her feedback. A crucial discovery was the need to make the product more intuitive and easy to navigate for busy doctors, which we accomplished by contextualizing the data. We extended our back-end API to include this capability and began a spike to join the data with AHRQ data for added value. We utilized Silex and Guzzle for the back-end, and PHPUnit as a simple automated testing framework. We used Jenkins as a Continuous Integration toolkit.


On Day Four we met with Tyson Kamikawa of Harvard Medical School. He helped us fine-tune our process through a “comparative value” exercise. We also met with designated legal, security, and privacy officers, and worked on eliminating Personally Identifying Information by using “portable URLs” to conveniently avoid storing PII while maintaining the functionality and usefulness of the product.


## Second Sprint


We began Day Five with a retrospective for the first sprint to confirm that we were learning and iterating along the way. Planning for the second sprint included story-writing based on our user interviews, along with estimating and prioritizing levels-of-effort. We discussed Style Guide and decided to write a small guide for our super-simple application, using the 18F style guides as a foundation. Our Operations Engineer fully vetted our deployment time using “immutable infrastructure”, which was measured at seven minutes.


Seeking offline feedback from our external users, we published the URL to our working MVP and asked the users to review the product before their next interviews to allow for the most effective feedback. Throughout our process, we used a limited form of the Lean UX methodology, attempting to verify each assertion with our test users.


We rapidly addressed a few bugs that our Quality Assurance process uncovered.  One story that we identified and prioritized was to switch to “horizontal stacked bar charts”. This required a rapid change to Google Graphs as an alternative to Chart.js. We nimbly made the switch and found that it enabled a more user-friendly way to present data.


On Day Six, we tied the back-end API to the front-end to provide normalization, making the data more consumable and readable. This was a major feature requested in our user interviews. Our engineers worked on automated tests for the back-end API. 


We completed our process on Day Seven, polishing the application and ensuring that deliverables.
