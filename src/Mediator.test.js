import mediator from './Mediator';

it('allows to exchange messages via #emit() and #on()', () => {
  var handleMessage = jest.fn();
  mediator.on('major.minor', handleMessage);

  mediator.emit('major.minor');

  expect(handleMessage).toBeCalled();
});

it('supports events with data', function() {
  var messageData = {key: 'value'};
  var handleMessage = jest.fn();
  mediator.on('major.minor', handleMessage);

  mediator.emit('major.minor', messageData);

  expect(handleMessage).toBeCalledWith(messageData);
});

it('supports events without data', function() {
  var handleMessage = jest.fn();
  mediator.on('major.minor', handleMessage);

  mediator.emit('major.minor');

  expect(handleMessage).toBeCalledWith();
});
