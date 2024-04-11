import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function submitForm(data) {
        let queryString = '';
        queryString += `${data.searchBy || 'title'}=true`;
        queryString += data.geoLocation ? `&geoLocation=${data.geoLocation}` : '';
        queryString += data.medium ? `&medium=${data.medium}` : '';
        queryString += `&isOnView=${data.isOnView || false}`;
        queryString += `&isHighlight=${data.isHighlight || false}`;
        queryString += data.q ? `&q=${data.q}` : '';

        router.push(`/artwork?${queryString}`);

        setSearchHistory(await addToHistory(queryString));
    };

    return (
        <>
            <h1 className="mt-4 mb-4 text-white lightfont" style={{ textAlign: 'center' }}>Advance Search</h1>

            <hr />
            <Form onSubmit={handleSubmit(submitForm)} className='text-white'>
                <Row>
                    <Col>
                        <Form.Group className="mb-5">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="q"
                                {...register('q', { required: '!!! This field is required !!!' })}
                                className={[errors.q ? 'is-invalid' : '', 'bg-dark text-white']}
                            />
                            {errors.q && (
                                <Form.Control.Feedback type="invalid" style={{ fontWeight: "bold" }}>
                                    {errors.q.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select
                            name="searchBy"
                            className="mb-3 bg-dark text-white"
                            {...register('searchBy')}
                        >
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-4">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation" {...register('geoLocation')} className='bg-dark text-white' />
                            <Form.Text className='text-warning'>
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-4">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register('medium')} className='bg-dark text-white' />
                            <Form.Text className='text-warning'>
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register('isHighlight')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register('isOnView')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}