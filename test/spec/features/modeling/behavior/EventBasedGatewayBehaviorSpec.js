import {
  bootstrapModeler,
  inject
} from 'test/TestHelper';

describe('features/modeling/behavior - event based gateway', function() {

  var diagramXML = require('./EventBasedGateway.bpmn');

  beforeEach(bootstrapModeler(diagramXML));

  describe('after connecting from event based gateway', function() {

    it('should remove existing connection', inject(
      function(modeling, elementRegistry) {

        // given
        var eventBasedGateway = elementRegistry.get('EventBasedGateway1'),
            intermediateEvent = elementRegistry.get('IntermediateCatchEvent'),
            existingConnection = elementRegistry.get('SequenceFlow_Existing');

        // when
        modeling.connect(eventBasedGateway, intermediateEvent, {
          type: 'bpmn:SequenceFlow'
        });

        // then
        expect(elementRegistry.get(existingConnection.id)).not.to.exist;
      }
    ));
  });
});
