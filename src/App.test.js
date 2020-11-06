import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from './App';
import TodoInput from './components/TodoInput';

Enzyme.configure({ adapter: new Adapter() });

describe('Todo testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const wrapper1 = shallow(<App />);
    expect(wrapper1).toMatchSnapshot();
  });

  it('matches heading todo input', () => {
    // console.log(wrapper.debug());
    expect(wrapper.find('#heading').text()).toContain('todo input');
  });

  it('matches heading todo list', () => {
    expect(wrapper.find('#list-heading').text()).toContain('todo list');
  });

  test('Todo Input button with initial text', () => {
    expect(wrapper.find('#inputButton').text()).toContain('add item');
  });

  test('input button test', () => {
    const title = 'test';
    const button = wrapper.find('#inputButton');
    expect(button.length).toBe(1);
    const instance = wrapper.instance();
    instance.setState({ item: title });
    wrapper.find('TodoInput').prop('handleSubmit')({ preventDefault: jest.fn() });
    wrapper.update();
    const items = wrapper.state().items;
    const titles = items.map((item) => (item.title));
    const item = titles.includes(title);
    expect(item).toBe(true);
  });

  test('edit button test', () => {
    const mockState = {
      items: [{ id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a', title: 'test' }],
      id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a',
      item: '',
      editItem: false
    };

    const mockResult = {
      items: [],
      item: 'test',
      editItem: true,
      id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a'
    }

    const instance = wrapper.instance();
    instance.setState(mockState);
    wrapper.find('TodoList').prop('handleEdit')('9ab55908-bf3a-4162-b7b7-cff4565bd06a');
    wrapper.update();
    expect(wrapper.state()).toEqual(mockResult);
  });

  test('delete button test', () => {
    const mockState = {
      items: [{ id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a', title: 'test' }],
    };

    const mockResult = {
      items: [],
    }

    const instance = wrapper.instance();
    instance.setState(mockState);
    wrapper.find('TodoList').prop('handleDelete')('9ab55908-bf3a-4162-b7b7-cff4565bd06a');
    wrapper.update();
    const items = wrapper.state().items;
    expect({ items }).toEqual(mockResult);
  });

  test('TodoInput handleChange function', () => {
    const mockValue = 'test';
    const event = { target: { value: mockValue } };
    wrapper.find('TodoInput').prop('handleChange')(event);
    wrapper.update();
    const item = wrapper.state().item;
    expect(item).toBe(mockValue);
  });

  test('clearList function', () => {
    const mockData = {
      items: [
        { id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a', title: 'test' },
        { id: 'e4f98052-a2db-4535-be31-de9beda51035', title: 'test2' }
      ],
      id: 'ee56337a-dbdb-4684-ad4a-8c7c8376de5c',
      item: '',
      editItem: false
    }
    const instance = wrapper.instance();
    instance.setState(mockData);
    wrapper.find('TodoList').prop('clearList')();
    wrapper.update();
    expect(wrapper.state().items).toEqual([]);
  });
});
