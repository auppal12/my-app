import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { Button, ListGroup } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if (!searchHistory) return null;

    function historyClicked(e, index) {
        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    return (
        <>
            <div className="mt-4">
                <h1 className="mt-4 mb-4 text-white" style={{ textAlign: 'center' }}>Search History</h1> <hr />
                {parsedHistory.length === 0 ? (
                    <span style={{ textAlign: 'center' }} className='text-white'> <br /><br /><br /><br /><br /> <br />
                        <p style={{ fontWeight: 'bold' }}>Nothing Here.</p>
                        <p>Try searching for some artwork.</p> <br />
                        <div>
                            <img src="/undraw_no_data_re_kwbl.svg" alt="No History" width="50" height="50" />
                        </div>
                    </span>
                ) : (
                    <ListGroup as="ol" numbered >
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item as="li"
                                key={index}
                                onClick={(e) => historyClicked(e, index)}
                                className={styles.historyListItem}
                                variant='success'
                            >
                                {Object.keys(historyItem).map(key => (
                                    <span key={key}>
                                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                    </span>
                                ))}
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => removeHistoryClicked(e, index)}
                                >
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        </>
    );
}
