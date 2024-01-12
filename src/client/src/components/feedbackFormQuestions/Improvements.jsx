import { Form, Row, Col } from 'react-bootstrap';

function Improvements ({ improvements, setImprovements }) {
  // Improvements will be an object with the properties notUseful, additionalCriteria, and suggestions.
  // Changing each text input will update a specific value on the improvements state object.
    return (
    <>
      <Form.Group controlId="improvements-1">
        <Form.Label>Were there any criteria (experience level, exposure level, etc.) that you found to be not useful?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements.notUseful}
          onChange={(e) =>
            setImprovements((prev) => ({
              ...prev,
              notUseful: e.target.value,
            }))
          }
        />
      </Form.Group>

      <Form.Group controlId="improvements-2">
        <Form.Label>Were there any additional criteria you wished the tool had considered?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements.additionalCriteria}
          onChange={(e) =>
            setImprovements((prev) => ({
              ...prev,
              additionalCriteria: e.target.value,
            }))
          }
        />
      </Form.Group>

      <Form.Group controlId="improvements-3">
        <Form.Label>Do you have any suggestions for how you think the tool could be improved?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements.suggestions}
          onChange={(e) =>
            setImprovements((prev) => ({
              ...prev,
              suggestions: e.target.value,
            }))
          }
        />
      </Form.Group>
    </>
    )
}

export default Improvements;