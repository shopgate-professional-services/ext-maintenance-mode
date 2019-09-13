import appConfig from '@shopgate/pwa-common/helpers/config';
import I18n from '@shopgate/pwa-common/components/I18n';
import { getUserEmail } from '@shopgate/pwa-common/selectors/user';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import openPageExtern from '@shopgate/pwa-core/commands/openPageExtern';
import styles from './style';
import getConfig from '../../helpers/getConfig';

const {
  enableMaintenanceMode,
  testUser,
  customHeadline,
  customMessage,
  imageSource,
  imageHref,
} = getConfig();

/**
 * MaintenanceMode component.
 */
class MaintenanceMode extends Component {
  static propTypes = {
    userEmail: PropTypes.string,
  };

  static defaultProps = {
    userEmail: null,
  };

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.handleTouchTimeout = undefined;
    this.state = {
      showMaintenanceMode: true,
    };
  }

  /**
   * Handles touch start action.
   */
  handleTouchStart = () => {
    this.handleTouchTimeout = setTimeout(() => {
      this.setState({
        showMaintenanceMode: false,
      });
    }, 5000);
  };

  /**
   * Handles touch end action.
   */
  handleTouchEnd = () => {
    clearTimeout(this.handleTouchTimeout);
  };

  handleClick = () => {
    openPageExtern({ src: imageHref });
  };

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    const { userEmail } = this.props;
    const maintenanceInfo = (imageSource && imageHref) ?
      (
        <div className={styles.background} >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={appConfig.logo}
              alt={appConfig.shopName}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
            />
            <button onClick={this.handleClick}>
              <img className={styles.image} src={imageSource} alt={appConfig.shopName} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.background} >
          <div className={styles.container}>
            <img className={styles.image} src={appConfig.logo} alt={appConfig.shopName} />
            <h3 onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
              {customHeadline || <I18n.Text string="maintenanceMode.headline.text" />}
            </h3>
            {customMessage || <I18n.Text string="maintenanceMode.message.text" />}
          </div>
        </div>
      );
    if (
      enableMaintenanceMode &&
      testUser.indexOf(userEmail) === -1 &&
      this.state.showMaintenanceMode
    ) {
      return maintenanceInfo;
    }

    return null;
  }
}

/**
 * @param {Object} state The current application state
 * @return {string}
 */
const mapStateToProps = state => ({
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps)(MaintenanceMode);
