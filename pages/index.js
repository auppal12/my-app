/********************************************************************************* * 
* * BTI425 – Assignment 6
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html * 
* Name: Amitoj Uppal     Student ID: 105186225       Date: 10th April, 2024
*
* Vercel App (Deployed) Link: https://explorart.vercel.app/ * 
********************************************************************************/

import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>Art Explorer</title>
        <meta name="description" content="Log in and search your favorite artworks from around the world" />
      </Head>
      <h1 className="mt-4 mb-4 text-white lightfont" style={{ textAlign: 'center' }}>Welcome to the Art Gallery</h1>

      <hr />
      <br />
      <div className="text-white">
        <div style={{ textAlign: "center", overflow: "hidden", borderRadius: "10px" }}>
          <Image

            src="/Metropolitan_Museum_of_Art_-_panoramio.jpg"
            alt="Metropolitan Museum of Art"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            priority={true}
          />
        </div>
        <hr />
        <Row >
          <Col md={6}>
            <p>
              The Metropolitan Museum of Art, colloquially &quot;The Met&quot;, is located in Central Park, NYC.
              It is one of the world&apos;s largest and finest art museums.
              The Met&apos;s mission is to collect, preserve, study, exhibit, and encourage appreciation
              for works that collectively represent the broad spectrum of human achievement and creativity.
              After negotiations with the City of New York in 1871, the Met was granted the land between the East Park Drive, Fifth Avenue, and the 79th and 85th Street transverse roads in Central Park.
              The first part of the Met to be built was a red-brick and stone &quot;mausoleum&quot; was designed by American architect Calvert Vaux and his collaborator Jacob Wrey Mould.
              The Fifth Avenue facade, Great Hall, and Grand Stairway were designed in the Beaux-Arts style by Richard Morris Hunt and his son, Richard Howland Hunt, in the late 1890s and early 1900s.
              The firm of McKim, Mead &amp; White completed the wings on the Fifth Avenue facade in 1910. The modernistic glass sides and rear of the museum are the work of Roche-Dinkeloo.
            </p>
          </Col>
          <Col >
            <p>
              The Met Fifth Avenue measures almost 1⁄4-mile (400 m) long and with more than 2 million square feet (190,000 m2) of floor space, more than 20 times the size of the original 1880 building.
              The museum building is an accretion of over 20 structures, most of which are not visible from the exterior. The City of New York owns the museum building and contributes utilities, heat, and some of the cost of guardianship.
              The Iris and B. Gerald Cantor Roof Garden is located on the roof near the southwestern corner of the museum.
              The museum&apos;s main building was designated a city landmark by the New York City Landmarks Preservation Commission in 1967, and its interior was separately recognized by the Landmarks Preservation Commission in 1977.
              The Met&apos;s main building was designated a National Historic Landmark in 1986, recognizing both its monumental architecture, and its importance as a cultural institution.
              {' '}
              <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer" style={{ fontWeight: "bold" }}>
                Learn more about The Met
              </a>
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}
