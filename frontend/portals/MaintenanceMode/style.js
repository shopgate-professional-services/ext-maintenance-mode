import { css } from 'glamor';

const background = css({
  background: '#FFFFFF',
  position: 'fixed',
  zIndex: 5000,
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
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
  top: '0%',
  left: '5%',
  right: '5%',
}).toString();

const image = css({
  maxWidth: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
}).toString();

export default {
  background,
  container,
  image,
  imageContainer,
};
