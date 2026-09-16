/**
 * AudioManager - Handles all music and sound effects for Swipe-Left-to-Survive
 * Manages background music tracks, seamless looping, SFX playback, and volume control.
 */

const AudioManager = {
  // Audio context and elements
  _musicAudio: null,
  _sfxContext: null,
  _sfxBuffers: {},
  _musicVolume: 0.5,
  _sfxVolume: 0.6,
  _currentTrack: null,
  _isMuted: false,
  _initialized: false,

  // Music track definitions
  TRACKS: {
    chill: 'assets/audio/music/chill_ambient.ogg',
    title: 'assets/audio/music/title_theme.ogg',
    mall: 'assets/audio/music/mall.ogg',
    restaurant: 'assets/audio/music/restaurant.ogg',
    bar: 'assets/audio/music/bar.ogg',
    cutscene: 'assets/audio/music/cutscene.ogg',
    battle: 'assets/audio/music/battle.ogg',
    victory: 'assets/audio/music/victory.ogg',
    defeat: 'assets/audio/music/defeat.ogg',
    algorithm: 'assets/audio/music/algorithm_boss.ogg',
    pattern: 'assets/audio/music/pattern_boss.ogg',
  },

  // SFX definitions
  SFX: {
    click: 'assets/audio/sfx/click.wav',
    notification: 'assets/audio/sfx/notification.wav',
    attack: 'assets/audio/sfx/attack.wav',
    damage: 'assets/audio/sfx/damage.wav',
    levelup: 'assets/audio/sfx/levelup.wav',
    match: 'assets/audio/sfx/match.wav',
    swipe: 'assets/audio/sfx/swipe.wav',
  },

  // Scene to track mapping
  SCENE_TRACKS: {
    // Keep the dating-app prologue relaxed; dramatic scenes have their own cue.
    prologue: 'chill',
    city_map: 'chill',
    apartment: 'chill',
    bedroom: 'chill',
    library: 'chill',
    park: 'chill',
    beach: 'chill',
    car: 'chill',
    parking_lot: 'chill',
    mall: 'mall',
    closet: 'mall',
    spa: 'chill',
    beachside_cafe: 'restaurant',
    restaurant: 'restaurant',
    bar: 'bar',
    nightclub: 'bar',
    cutscene: 'cutscene',
    title: 'title',
    battle: 'battle',
    victory: 'victory',
    defeat: 'defeat',
    algorithm_boss: 'algorithm',
    pattern_boss: 'pattern',
  },

  init() {
    if (this._initialized) return;
    this._initialized = true;

    // Create audio element for music
    this._musicAudio = new Audio();
    this._musicAudio.loop = true;
    this._musicAudio.volume = this._musicVolume;

    // Create AudioContext for SFX
    try {
      this._sfxContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not supported');
    }

    // Preload SFX buffers
    this._preloadSfx();
  },

  _preloadSfx() {
    if (!this._sfxContext) return;
    for (const [name, url] of Object.entries(this.SFX)) {
      fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => this._sfxContext.decodeAudioData(buf))
        .then(decoded => {
          this._sfxBuffers[name] = decoded;
        })
        .catch(err => {
          console.warn(`Failed to load SFX: ${name}`, err);
        });
    }
  },

  /**
   * Play a music track by name. Fades out current track, fades in new one.
   * @param {string} trackName - Key from TRACKS
   * @param {number} fadeTime - Fade duration in seconds (default 1.5)
   */
  playMusic(trackName, fadeTime = 1.5) {
    if (!this._initialized) this.init();

    const trackUrl = this.TRACKS[trackName];
    if (!trackUrl) {
      console.warn(`Unknown music track: ${trackName}`);
      return;
    }

    if (this._currentTrack === trackName) return; // Already playing

    const wasPlaying = this._musicAudio && !this._musicAudio.paused;

    if (wasPlaying) {
      // Fade out current track
      this._fadeMusic(0, fadeTime, () => {
        this._musicAudio.src = trackUrl;
        this._musicAudio.volume = 0;
        this._musicAudio.play().then(() => {
          this._fadeMusic(this._isMuted ? 0 : this._musicVolume, fadeTime);
        }).catch(e => {
          console.warn('Music playback failed:', e);
        });
      });
    } else {
      this._musicAudio.src = trackUrl;
      this._musicAudio.volume = 0;
      this._musicAudio.play().then(() => {
        this._fadeMusic(this._isMuted ? 0 : this._musicVolume, fadeTime);
      }).catch(e => {
        console.warn('Music playback failed:', e);
      });
    }

    this._currentTrack = trackName;
  },

  /**
   * Play music for a specific scene/location.
   * @param {string} sceneType - Scene key (city_map, mall, battle, etc.)
   */
  playSceneMusic(sceneType) {
    const track = this.SCENE_TRACKS[sceneType] || 'chill';
    this.playMusic(track);
  },

  /**
   * Stop music with a fade out.
   * @param {number} fadeTime - Fade duration in seconds
   */
  stopMusic(fadeTime = 1.5) {
    if (!this._musicAudio || this._musicAudio.paused) return;
    this._fadeMusic(0, fadeTime, () => {
      this._musicAudio.pause();
      this._currentTrack = null;
    });
  },

  /**
   * Play a sound effect.
   * @param {string} sfxName - Key from SFX
   * @param {number} volume - Override volume (0-1)
   */
  playSfx(sfxName, volume = null) {
    if (!this._initialized) this.init();
    if (!this._sfxContext) return;

    const buffer = this._sfxBuffers[sfxName];
    if (!buffer) {
      console.warn(`SFX not loaded: ${sfxName}`);
      return;
    }

    const source = this._sfxContext.createBufferSource();
    source.buffer = buffer;

    const gainNode = this._sfxContext.createGain();
    const vol = volume !== null ? volume : (this._isMuted ? 0 : this._sfxVolume);
    gainNode.gain.value = vol;

    source.connect(gainNode);
    gainNode.connect(this._sfxContext.destination);
    source.start(0);
  },

  /**
   * Set music volume (0-1).
   */
  setMusicVolume(vol) {
    this._musicVolume = Math.max(0, Math.min(1, vol));
    if (this._musicAudio && !this._musicAudio.paused && !this._isMuted) {
      this._musicAudio.volume = this._musicVolume;
    }
  },

  /**
   * Set SFX volume (0-1).
   */
  setSfxVolume(vol) {
    this._sfxVolume = Math.max(0, Math.min(1, vol));
  },

  /**
   * Toggle mute on/off.
   */
  toggleMute() {
    this._isMuted = !this._isMuted;
    if (this._musicAudio) {
      this._musicAudio.volume = this._isMuted ? 0 : this._musicVolume;
    }
    return this._isMuted;
  },

  /**
   * Resume audio context (needed for browsers that block autoplay).
   */
  resume() {
    if (this._sfxContext && this._sfxContext.state === 'suspended') {
      this._sfxContext.resume();
    }
    if (this._musicAudio && this._musicAudio.paused && this._currentTrack) {
      this._musicAudio.play().catch(() => {});
    }
  },

  // Internal: fade music to target volume over time
  _fadeMusic(targetVolume, duration, callback) {
    if (!this._musicAudio) {
      if (callback) callback();
      return;
    }

    const startVolume = this._musicAudio.volume;
    const steps = 30;
    const stepTime = (duration * 1000) / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      this._musicAudio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (step >= steps) {
        clearInterval(interval);
        this._musicAudio.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  },

  // Get current state for UI
  getState() {
    return {
      currentTrack: this._currentTrack,
      isMuted: this._isMuted,
      musicVolume: this._musicVolume,
      sfxVolume: this._sfxVolume,
      isPlaying: this._musicAudio && !this._musicAudio.paused,
    };
  },
};

// Export for ES module usage
export { AudioManager };
