import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Container, Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Image from 'next/image';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    return (
        <>
            <Container>
                <h1 className="mt-4 mb-4 text-white lightfont" style={{ textAlign: 'center' }}>Favourites</h1>
                <hr />
                {favouritesList.length === 0 ? (
                    <span style={{ textAlign: 'center' }} className='text-white'> <br /><br /><br /><br /><br /> <br />
                        <p style={{ fontWeight: 'bold' }}>Nothing Here.</p>
                        <p>Try adding some new artwork to the favourite list.</p>
                        <div>
                            <Image src="/undraw_no_data_re_kwbl.svg" alt="No History" width="50" height="50" priority />
                        </div>
                    </span>
                ) : (
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {favouritesList.map((objectID, index) => (
                            <Col key={index}>
                                <ArtworkCard objectID={objectID} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}
