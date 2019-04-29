import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { is } from '../../../util/ModelUtil';

export default function EventBasedGatewayBehavior(eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  // remove existing connection before connecting from event-based gateway
  this.preExecuted('connection.create', function(event) {

    var source = event.context.source,
        target = event.context.target,
        oldConnections = target.incoming;

    if (
      is(source, 'bpmn:EventBasedGateway') &&
      target.incoming.length > 0
    ) {
      oldConnections.forEach(function(connection) {
        modeling.removeConnection(connection);
      });
    }
  });
}

EventBasedGatewayBehavior.$inject = [
  'eventBus',
  'modeling'
];

inherits(EventBasedGatewayBehavior, CommandInterceptor);
