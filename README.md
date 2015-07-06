We used agile, lean, and human-centered design (HCD) methodologies to develop our Agile Delivery Services (ADS I) working prototype, [sideeffect.io](https://www.sideeffect.io/). We designed our functional, responsive, mobile-friendly Web-based application to help caregivers visualize any possible adverse events of a multiple drug regimen. (Please note the letters in parentheses next to links throughout this document that verify our adherence to the criteria in Attachment E.)

Our primary innovative achievement was the augmentation of the OpenFDA [Adverse Event](https://open.fda.gov/drug/event/) data by showing comparative prescription volumes derived from another dataset, the AHRQ [Medical Expenditures Panel Survey](http://meps.ahrq.gov/mepsweb/). Because the OpenFDA data does not contain usage information and reports only the number of adverse events, it is difficult to compare the negative effects of a drug that is widely used versus one that is lightly used. Our application solves this issue by combining two datasets, together with an intuitive user interface, to aid doctors in creating multiple drug regimens and visualizing the number of adverse events across an entire suite of prescriptions. 

We used a SCRUM development process that was comprised of the following sprints. 

## First Sprint

Day One: We mustered a [(b) multidisciplinary team](https://github.com/CivicActions/nebula/blob/master/evidence/CivicActions%20GSA%20Bid_%20Budget%20-%20Estimates.pdf) that consisted of four developers, one [(a) product owner](https://github.com/CivicActions/nebula/blob/master/evidence/AppointmentOfProductOwner.md) (PO), one product manager, one designer, one User Experience expert, one style guide designer, and one writer. Our PO was responsible for ensuring project success and satisfying deliverable requirements.

In accordance with SCRUM methodology, we held a [stand-up meeting](https://github.com/CivicActions/nebula/blob/master/CallNotes/Agendas&ActionItems.md) every morning. We used [GitHub](https://github.com/CivicActions/nebula/issues) to address bugs and [Trello](https://github.com/CivicActions/nebula/blob/master/agile-tickets/TrelloScreenShots.md) to develop most of our story writing and tracking.

In order to pinpoint user needs from the outset, we immediately scheduled a [(c)(d) interview](https://github.com/CivicActions/nebula/blob/master/user-interviews/InitialUserInterview.md) with an actual user, Dr. Martha Ogilvie of NIH. Prior to the interview, we conducted an ideation session to proactively brainstorm possible requirements and solutions. The session included candidate stories and a prioritization exercise. Dr. Ogilvie described common needs of healthcare professionals that validated our approach and helped us reprioritize our stories. Utilizing her feedback, we worked on several “spikes” to identify risks and uncertainties. From there, our Minimum Viable Product (MVP) began to take shape.

Our process ultimately included [six](https://github.com/CivicActions/nebula/tree/master/user-interviews) user interviews that were [video recorded](https://github.com/CivicActions/nebula/blob/master/user-interviews/videolinks.md). During our interviews, we frequently used a simple variant of a card-sorting exercise where we asked our users to choose which one of two alternatives held greater value.

Day Two: We assigned a product owner and dove into story writing, backlog grooming, and estimation. We channeled these activities into a (d) Design Studio led by our HCD expert. As expected, the stellar ideas rose to the top. Using these ideas, we started the MVP deployment, wireframes, automated testing and spiking the API. We decided to utilize Chart.js to convey graphical adverse drug effect data to the user and JQuery UI autocomplete as a simple input tool.

Always conscious of “Open First” principles, we opened our repository to the (k) public. We blogged about our understanding of 18F’s needs and goals, encouraging edits from the public in our repo and sharing them via social media. Throughout the project, our goal and mantra was to be “Fiercely Open”. 

Following the USDS Playbook, we documented our accomplishments by methodically checking off all plays and answering every question in the playbook. By the end of Day Two we had a working MVP to improve upon.

Day Three: We held our (g) second interview with Dr. Ogilvie to discuss the MVP. In response to her feedback, we adjusted our Graphical User Interface (GUI) design.  She also helped us pinpoint a crucial discovery -- the need to facilitate ease-of-use for busy doctors. We accomplished this by contextualizing the data and extending our backend API to include this capability. We then began a spike to join the OpenFDA data with the AHRQ data. This provided greater contextualization of adverse drug events by showing them in conjunction with prescription frequency.

We (i) utilized Silex and Guzzle for the backend and PHPUnit as a simple automated testing framework. For Continuous Integration we used Jenkins and (m)(o) Docker Compose. For Continuous Deployment of idempotent servers we used Docker Machine and (j) Amazon Web Services. For CDN and DNS automation we used Cloudflare.

Our automated (k) tests of the backend were useful throughout the project. We developed the ability to initiate a deployment from within Slack, the online messaging tool used by our team for real-time communication. This allowed for maximum efficiency and a high volume of automated tests that ultimately resulted in a better prototype.

We discussed privacy and security in a creative way by assigning experts to play the role of security officers. Through these dialogues, we clarified that we wanted to avoid storing any Personally Identifying Information (PII). This gave rise to the idea of a “portable URL” which we later implemented.

Day Four: We (g) interviewed Tyson Kamikawa of Harvard Medical School. He helped us fine tune our process through a “comparative value” exercise. We also met with designated legal, security, and privacy officers. We worked on our idea of using “portable URLs” that allowed us to avoid storing PII while maintaining product functionality and usefulness.

## Second Sprint

Day Five: We held a retrospective of the first sprint. We performed story writing based on our user interviews while estimating and prioritizing levels-of-effort. We wrote a small (e) style guide for our super-simple application using the 18F style guides as a foundation. Our Operations Engineer fully vetted time for automated, build, testing and deployment, measured at seven minutes for the frontend API and 20 minutes for the backend.

Seeking feedback from external users, we published the working MVP URL. Throughout our process, we used a limited form of the Lean UX methodology, verifying each assertion with our test users. We published installation instructions in our (p) DevOps manual to allow others to duplicate our work.

We rapidly addressed a few bugs that our Quality Assurance process uncovered. We switched to “horizontal stacked bar charts” which required a rapid change to Google Graphs as an alternative to Chart.js. Having focused on medical professionals as our target audience and reached a functional level of maturity, we began conforming to our style guide.

Our system was deployed on (l) Amazon Web Services on a free operating system using (m,o) Docker. We released all of the project code that we wrote into the (q) public domain.

Our users indicated that they wanted a way to tie our results to their patient files without giving us access to patient information. We decided that a portable URL was the best solution to this challenge and completed a portable URL system that allows any drug regimen to be shared as a simple query string/URL, such as http://sideeffect.io/?saved=CRESTOR+BENICAR+ASPIRIN. We later verified this functionality with our users in formal user interviews.

Day Six: We tied the backend API to the frontend to provide normalization and make the data more consumable and readable, a major feature requested during our user interviews. Our engineers worked on additional automated tests for the backend API. 

Day Seven: We polished the application and validated that we met all RFQ deliverables. A short video shows our (h) responsiveness to mobile devices. Our users confirmed that iPad/tablet usage is likely and that phone usage is much less likely. 


## Third Sprint

Day Eight: Although we had a presentable product, we took advantage of the extended deadline and spent this day making our application more robust and accessible. 

As in all sprints, we followed a rigorous iterative SCRUM based process, holding retrospectives at the end of (g) Sprint1, Sprint2, and Sprint3. During the third sprint, our security officer had increased availability for more in-depth discussion of security issues.

As the project advanced, we increased our focus on accessibility.  Our style guide utilized data display colors that were visually separated in grayscale to ensure the product was usable by those without full color vision.


Day Nine: We held a companywide optional design and code review of our working prototype. This produced some refactorings that we added to our backlog for future prioritization and implemented shortly thereafter. We held final (f) user interviews to verify usability and performed detailed accessibility testing and remediation.

The issuance of the second due date extension presented us with a challenge: Should we continue working at great expense or remain in code freeze with our functional product? Because we worked so hard to meet the original deadline, our product was well advanced. We decided to focus on additional user testing to a wider audience by building feedback tools into the application and promoting its experimental use through social media.

We destaffed the developers and prepared a promotion campaign as we worked on all the requirements for the RFQ, including continuous (n) continuous monitoring.

On the morning of Friday July 3rd, we had exactly 100 issues in our Git Repository, 61 of which had been closed.  We added a (f) survey to our site to reach more users and obtain additional feedback.

