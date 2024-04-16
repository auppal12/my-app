import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const {
        primaryImageSmall,
        title,
        objectDate,
        classification,
        medium,
    } = data;

    const image_url = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

    return (
        <>
            <br /> <br />
            <Card border="dark" className='bg-dark text-white mb-3 nice'>
                <Card.Img variant="top" src={image_url} alt='artwork' />
                <Card.Body>
                    <Card.Title>{title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {objectDate || 'N/A'} <br />
                        <strong>Classification:</strong> {classification || 'N/A'} <br />
                        <strong>Medium:</strong> {medium || 'N/A'}
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
                        <Button as="a" variant="primary" >
                            ID: {objectID} / Details
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
}