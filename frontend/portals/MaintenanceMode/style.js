import { css } from 'glamor';

const background = css({
  background: '#FFFFFF',
  position: 'fixed',
  zIndex: 5000,
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
  overflowY: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
}).toString();

const container = css({
  position: 'absolute',
  background: '#FFFFFF',
  textAlign: 'center',
  top: '25%',
  left: '5%',
  right: '5%',
}).toString();

const imageContainer = css({
  position: 'absolute',
  background: '#FFFFFF',
  textAlign: 'center',
  top: '5%',
  left: '2%',
  right: '2%',
}).toString();

const image = css({
  maxWidth: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
}).toString();

const linkButton = css({
  width: '100%',
  textAlign: 'center',
  margin: '15px 0',
}).toString();

export default {
  background,
  container,
  image,
  imageContainer,
  linkButton,
};
