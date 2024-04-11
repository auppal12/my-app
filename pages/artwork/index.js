/********************************************************************************
* BTI425 – Assignment 5
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Amitoj Uppal            Student ID: 105186225        Date: 20 March, 2024
*
********************************************************************************/

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
        (url) => fetch(url).then((res) => res.json())
    );

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    function nextPage() {
        if (page < artworkList.length - 1) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            const results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }

    }, [data]);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!artworkList) {
        return null;
    }

    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0 ? (
                    artworkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Card border="dark" className='bg-dark text-white mb-3'>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                Try searching for something else.
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            {artworkList.length > 0 && (
                <Row >
                    <Col>
                        <Pagination className="d-flex justify-content-start align-items-center">
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <img src="/undraw_dog_c7i6.svg" alt="No History" width="70" height="70" />
                    </Col>
                </Row>
            )}
        </>
    );
};