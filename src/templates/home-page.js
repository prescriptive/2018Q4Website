import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import about9 from '../images/img09.jpg'
import aboutabstract from '../images/Abstract_White_Bkgd.jpg'
import about11 from '../images/img11.jpg'
import about12 from '../images/img12.png'
import leader13 from '../images/img13.jpg'
import leader14 from '../images/img14.jpg'
import leader15 from '../images/img15.jpg'
import contactdots from '../images/Dots_Contact.png'
import partner17 from '../images/img17.png'
import partner18 from '../images/img18.png'
import partner19 from '../images/img19.png'
import partner20 from '../images/img20.png'
import partner21 from '../images/img21.png'
import partner22 from '../images/img22.png'
import partner23 from '../images/img23.png'
import partner24 from '../images/img24.png'
import partner25 from '../images/img25.png'
import partner26 from '../images/img26.png'
import partner27 from '../images/img27.png'
import partner28 from '../images/img28.png'
import partner29 from '../images/img29.png'
import partner30 from '../images/img30.png'
import partner31 from '../images/img31.png'
import partner32 from '../images/img32.png'
import partner33 from '../images/img33.png'
import partner34 from '../images/img34.png'
import partner35 from '../images/img35.png'
import cta36 from '../images/img36.png'
import dell from '../images/dell-tech-white.png'
import hp from '../images/white_hp.png'

export const HomePageTemplate = ({ title, intro, services, content, contentComponent }) => {
  return (
<main id="main" className="main">
  <section className="hero" style={{ backgroundImage: `url(${intro.introimage})` }}>

    <div class="hero-holder">

					<div class="container">

						<div class="content">
							<div class="caption-holder">
								<h1>{intro.heading}</h1>
							</div>
							<p>{intro.description}</p>
						</div>

					</div>

				</div>
    
  </section>

  <section id="services" className="services">

  <div className="container">
					<div class="caption-holder caption-white">
						<h2>Services</h2>
					</div>

					<div class="services-list">
          {services.map(service => (
            <div class="services-item">
            <div class="image-holder">
              <img src={service.icontext.icon} alt={service.icontext.text} />
            </div>
            <div class="description">
								<p>{service.icontext.text}</p>
							</div>
          </div>
          ))}
					</div>
				</div>

			</section>

      <section id="about" class="about">
				<div class="about-item">
					<div class="col bg-image" style={{ backgroundImage: `url(${about9})` }}></div>

					<div class="col content" style={{ backgroundImage: `url(${aboutabstract})` }}>
						<div class="content-holder">
							<div class="caption-holder caption-red">
								<h2>Why We’re Different</h2>
							</div>
							<ul class="list marker">
								<li>All technical team members are engineers.</li>
								<li>Senior engineers and consultants stay engaged from pre-sale through project completion.</li>
								<li>Our consultative process results in better project outcomes and better -educated clients.</li>
								<li>Outcome-based, fixed pricing. Our customers pay for results.</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="about-item">
					<div class="col bg-image" style={{ backgroundImage: `url(${about11})` }}></div>

					<div class="col content">
						<div class="content-holder">
							<div class="caption-holder caption-red">
								<h2>Our Process</h2>
							</div>
							<div class="image-holder">
								<img src={about12} alt="Our Process" />
							</div>
							<ol class="list">
								<li>Define the problem.</li>
								<li>Articulate a shared vision of success.</li>
								<li>Design the solution leveraging Prescriptive Data Solutions Collaborative Framework.</li>
								<li>Plan the project, including resources, timeline, milestones and key success factors.</li>
								<li>Work the plan providing continuous feedback to project stakeholders.</li>
								<li>Conduct a post-project analysis to ensure accountability, alignment, and closure.</li>
							</ol>
						</div>
					</div>
				</div>
			</section>


      <section class="leadership">

				<div class="container">

					<div class="caption-holder caption-red">
						<h2>Leadership</h2>
					</div>
					<div class="leadership-list">
						<div class="leader-item">
							<div class="leader-holder">

								<div class="main-content">
									<div class="image-holder">
										<img src={leader13} alt="Terry Murray" />
									</div>
									<h3>Terry Murray</h3>
									<span class="person-position">President</span>
									<div class="description">
										<p>Terry Murray has more than twenty years of IT industry experience. Prior to founding Prescriptive Data Solutions, Mr. Murray was instrumental in growing a regional technical consulting organization from five people in a single location to an organization with more than 150 employees and locations across the United States, which generated more than $150 million in revenue. As a part of that team, Mr. Murray held a number of roles including System Engineer, Practice Manager, Regional Director, VP of Technical Engagement, and CTO.  Mr. Murray was responsible for developing the engagement model, setting technical direction for the organization and working directly with clients on their most complex challenges. Mr. Murray is based in San Antonio.</p>
									</div>
								</div>

								<ul class="list-social">
									<li>
										<a target="_blank" href="https://www.linkedin.com/in/terry-murray-59aa63/"><span class="icon-linkedin"></span></a>
									</li>
									<li>
										<a target="_blank" href="https://twitter.com/terrybmurray"><span class="icon-tweet"></span></a>
									</li>
								</ul>
							</div>
						</div>
						<div class="leader-item">
							<div class="leader-holder">
								<div class="main-content">
									<div class="image-holder">
										<img src={leader14} alt="Joe Galvan" />
									</div>
									<h3>Joe Galvan</h3>
									<span class="person-position">Chief Architect</span>
									<div class="description">
										<p>Joe Galvan possesses an extensive background in data center technologies, having worked for more than 15 years in highly available and secure enterprise environments. Mr. Galvan’s primary focus areas include compute, analytics, storage, virtualization, data protection, disaster recovery, business continuity, and application delivery.  He has proven himself effective in building relationships that are founded on a mutual interest in realizing success through planning, designing, implementing, and maintaining solutions. Mr. Galvan is dedicated to providing consulting and professional services to fulfill clients' technology needs in order to run, grow, and transform. Mr. Galvan is based in Austin.</p>
									</div>
								</div>
								<ul class="list-social">
									<li>
										<a target="_blank" href="https://www.linkedin.com/in/joemgalvan/"><span class="icon-linkedin"></span></a>
									</li>
									<li>
										<a target="_blank"href="https://twitter.com/jgalvanatx"><span class="icon-tweet"></span></a>
									</li>
								</ul>
							</div>
						</div>
						<div class="leader-item">
							<div class="leader-holder">
								<div class="main-content">
									<div class="image-holder">
										<img src={leader15} alt="Justin Richards" />
									</div>
									<h3>Justin Richards</h3>
									<span class="person-position">Chief Architect</span>
									<div class="description">
										<p>Justin Richards has worked in high-end enterprise data center environments for more than 24 years, including the United States Air Force and AT&amp;T. He has spent the last ten years providing consulting services to large multi-data center customers in the healthcare, retail, service provider, telecom, cloud, and energy verticals. His specialties include large-scale SAN/NAS, storage and compute virtualization, disaster recovery and data protection, business continuity, and next-generation hybrid data center architectures. Mr. Richards has a proven history of providing consultative leadership with an average working relationship of more than eight years with many of his customers. In several cases, he has worked to transition their data centers multiple times over during hardware refreshes or facility relocations. He is based in Dallas.</p>
									</div>
								</div>
								<ul class="list-social">
									<li>
										<a target="_blank" href="https://www.linkedin.com/in/jurichards/"><span class="icon-linkedin"></span></a>
									</li>
									<li>
										<a target="_blank" href="https://twitter.com/72stroker"><span class="icon-tweet"></span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</div>

			</section>

      <section id="contact-us" class="contact-us" style={{ backgroundImage: `url(${contactdots})` }}>

<div class="container">

  <div class="top-content">
    <div class="content">

      <div class="caption-holder caption-red">
        <h2>Contact Us</h2>
        <p>Thank you for your interest in Prescriptive Data Solutions. For more information, please fill out the following form and we'll get back to you as soon as we can. We look forward to hearing from you!</p>
      </div>
      <form name="contact3" method="POST" class="form-validation" novalidate="novalidate" netlify-honeypot="bot-field" data-netlify="true">
								<div class="form-group important">
										 <label>Important: </label><input name="important" />
								</div>
								<div class="form-group">
									<label for="name" class="lb-name">First Name *</label>
									<input type="text" name="name" id="name" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<label for="surname" class="lb-surname">Last Name *</label>
									<input type="text" name="surname" id="surname" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<label for="email" class="lb-email">Email *</label>
									<input type="email" name="email" id="email" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<label for="phone" class="lb-phone">Phone Number</label>
									<input type="tel" name="phone" id="phone" class="form-control" data-required="false" data-interactive="true" />
								</div>
								<div class="form-group text">
									<label for="textarea" class="lb-message">Message*</label>
									<textarea name="textarea" id="textarea" class="textarea form-control" data-required="true" data-trim="true"/>
								</div>
								<div data-netlify-recaptcha="true"></div>
								<div>
									<button type="submit" class="btn btn-submit">Send Message</button>
								</div>
							</form>

    </div>
    <div class="contact-aside">
							<div class="contact">
								<div class="contact-item">
									<strong>Email</strong>
									<a href="mailto:info@prescriptive.solutions">info@prescriptive.solutions</a>
								</div>
								<div class="contact-item">
									<strong>Phone</strong>
									<a href="tel:8882523182">888.252.3182</a>
								</div>
								<div class="contact-item">
									<strong>Fax</strong>
									<span>210.961.8108</span>
								</div>
							</div>
						</div>
					</div>

					<address class="location">
						<div class="location-item">
							<div class="address">
								<strong class="name-office">san antonio office</strong>
								<ul class="address-list">
									<li>20079 Stone Oak Pkwy., </li>
									<li>Ste 1105 #435</li>
									<li>San Antonio, TX 78258</li>
								</ul>
							</div>
							<div class="map">
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.647934883196!2d-98.49093828450566!3d29.64296704438013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c62773f5b691b%3A0xa8adf1957f3995db!2s20079+Stone+Oak+Pkwy+%231105%2C+San+Antonio%2C+TX+78258!5e0!3m2!1sen!2sus!4v1541017168893" width="600" height="450" frameborder="0" style={{border: '0px'}} allowfullscreen=""></iframe>
							</div>
						</div>
						<div class="location-item">
							<div class="address">
								<strong class="name-office">dallas-fort worth office</strong>
								<ul class="address-list">
									<li>825 Watters Creek Blvd</li>
									<li>Building M, Suite 250</li>
									<li>Allen, TX 75013</li>
								</ul>
							</div>
							<div class="map">
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3342.7845830123597!2d-96.68551628444959!3d33.088451475346744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c175d090cfdc1%3A0xb8cd67e94d380ca9!2s825+Watters+Creek+Blvd+Building+M%2C+Suite+250%2C+Allen%2C+TX+75013!5e0!3m2!1sen!2sus!4v1541017256684" width="600" height="450" frameborder="0" style={{border: '0px'}} allowfullscreen=""></iframe>
							</div>
						</div>
					</address>
				</div>
</section>

<section class="partners">
				<div class="container">
					<div class="caption-holder caption-white">
						<h2>Partners</h2>
					</div>

					<div class="partners-list">
						<div class="partner-item"><img src={partner17} alt="amazon-web-services" /></div>
						<div class="partner-item"><img src={partner18} alt="cisco" /></div>
						<div class="partner-item"><img src={partner19} alt="commvault" /></div>
						<div class="partner-item"><img src={partner20} alt="docker" /></div>
						<div class="partner-item"><img src={partner21} alt="hitachi" /></div>
						<div class="partner-item"><img src={partner22} alt="indexengines" /></div>
						<div class="partner-item"><img src={partner23} alt="microsoft" /></div>
						<div class="partner-item"><img src={partner24} alt="net-app" /></div>
						<div class="partner-item"><img src={partner25} alt="nutanix" /></div>
						<div class="partner-item"><img src={partner26} alt="palo-alto" /></div>
						<div class="partner-item"><img src={partner27} alt="qct" /></div>
						<div class="partner-item"><img src={partner28} alt="red-hat-white" /></div>
						<div class="partner-item"><img src={partner29} alt="rubrik" /></div>
						<div class="partner-item"><img src={partner30} alt="sendero-cloud" /></div>
						<div class="partner-item"><img src={partner31} alt="spectra" /></div>
						<div class="partner-item"><img src={partner32} alt="turbonomic-lg-white" /></div>
						<div class="partner-item"><img src={partner33} alt="veeam" /></div>
						<div class="partner-item"><img src={partner34} alt="vmware" /></div>
						<div class="partner-item"><img src={partner35} alt="zerto" /></div>
						<div class="partner-item"><img width="200" src={dell} alt="zerto" /></div>
						<div class="partner-item"><img width="200" src={hp} alt="zerto" /></div>
					</div>
				</div>

			</section>


			<section class="call-to-action">

				<div class="container">
					<div class="bg-image">
						<img src={cta36} alt="image description" />
					</div>
					<div class="content">

						<div class="caption-holder caption-red">
							<h2>Looking for Expert Advice?</h2>
							<p>We’re happy to help.</p>
						</div>

						<a href="#contact-us" class="btn btn-sm">Contact Us</a>
					</div>
				</div>
				
			</section>

  </main>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  introheading: PropTypes.string,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      icontext: PropTypes.array,
    })
  ),
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        introheading={post.frontmatter.intro.heading}
        introdescription={post.frontmatter.intro.description}
        introimage={post.frontmatter.intro.introimage}
        intro={post.frontmatter.intro}
        services={post.frontmatter.services}
        content={post.html}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        intro{
          heading
          description
          introimage
        }
        services{
          icontext{
            icon
            text
          }
        }
      }
    }
  }
`
