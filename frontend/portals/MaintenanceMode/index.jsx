import appConfig from '@shopgate/pwa-common/helpers/config';
import I18n from '@shopgate/pwa-common/components/I18n';
import { Link } from '@shopgate/engage/components';
import Button from '@shopgate/pwa-ui-shared/Button';
import { getUserEmail } from '@shopgate/pwa-common/selectors/user';
import { getClientInformation } from '@shopgate/engage/core';
import { isIos } from '@shopgate/pwa-common/selectors/client';
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
  iosAppVersions,
  iosLink,
  iosButtonText,
  androidAppVersions,
  androidLink,
  androidButtonText,
} = getConfig();

/**
 * MaintenanceMode component.
 */
class MaintenanceMode extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    isIosDevice: PropTypes.bool,
    userEmail: PropTypes.string,
  };

  static defaultProps = {
    appVersion: null,
    isIosDevice: null,
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
   * Checks if the app version is blocked.
   * @param {string} appVersion App version
   * @returns {bollean}
   */
  appVersionIsBlocked = (appVersion) => {
    let appVersions = [];

    if (this.props.isIosDevice) {
      appVersions = iosAppVersions.replace(/ /g, '').split(',');
    } else {
      appVersions = androidAppVersions.replace(/ /g, '').split(',');
    }

    // All versions
    if (appVersions.includes('')) {
      return true;
    }

    // Client version
    if (appVersions.includes(appVersion)) {
      return true;
    }

    return false;
  };

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    const {
      userEmail, appVersion, isIosDevice,
    } = this.props;

    const maintenanceInfo = (imageSource && imageHref) ?
      (
        <div className={styles.background}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={appConfig.logo}
              alt={appConfig.shopName}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
            />
            <button type="button" onClick={this.handleClick}>
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
            {(!isIosDevice && androidLink) && (
              <Link className={styles.linkButton} href={androidLink} state={{ target: '_blank' }}>
                <Button>{androidButtonText}</Button>
              </Link>
            )}
            {(isIosDevice && iosLink) && (
              <Link className={styles.linkButton} href={iosLink} state={{ target: '_blank' }}>
                <Button>{iosButtonText}</Button>
              </Link>
            )}
          </div>
        </div>
      );
    if (
      enableMaintenanceMode &&
      testUser.indexOf(userEmail) === -1 &&
      this.state.showMaintenanceMode &&
      this.appVersionIsBlocked(appVersion)
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
  appVersion: getClientInformation(state).appVersion,
  isIosDevice: isIos(state),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps)(MaintenanceMode);
