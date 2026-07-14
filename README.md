# Descent

**A private, offline binaural meditation instrument for the browser. No account, no analytics, no tracking.**

Descent generates layered audio environments from binaural tones, noise, slow amplitude modulation, and optional wave textures. It is designed as a focused space for sitting, exploring gradual shifts in beat frequency, or building a custom sound from first principles.

Everything runs locally in the browser. Descent has no backend, sends no personal data, and stores custom presets only on the current device.

## Modes

### Sit

Choose from three intention-led groups:

- **Clarity:** Focus, Flow, Lift, and Sharp
- **Daytime:** Calm, Settle, Ground, and Breathe
- **Deep Sleep:** Drift, Shore, Deep, and Tide

Each preset configures the binaural difference, carrier, noise bed, and pulse behavior. Some sleep presets use wave textures and work without headphones; binaural presets require stereo separation.

### Explore

Move through five stages from Alpha toward Delta: **Settle, Drift, Deepen, Dissolve, and Still**. Hold one stage or enable Journey to glide through the progression during a session.

The stage names and colors are an experiential framework. They reference common EEG frequency-band labels but do not claim to create or guarantee a particular mental state.

### Tinker

Build a sound with two oscillators and a configurable noise layer:

- Independent pitch, waveform, low-pass filter, pan, and volume
- White, pink, or brown noise with stereo width and filtering
- Independent tone and noise pulse depth/rate
- Live binaural-difference readout and approximate brainwave-band map
- Local custom-preset saving, renaming, loading, and deletion

## Using Descent

1. Use headphones for binaural presets so each ear receives its intended oscillator.
2. Keep the volume low and comfortable.
3. Choose a mode and sound, set a duration, then press the central orb.
4. Press the orb again to pause or resume.

Sessions fade in and out gently. Timed and open-ended sessions are supported, along with optional screen-wake behavior where the browser permits it.

## Install as an app

Descent is a Progressive Web App.

- **iPhone/iPad:** open the deployed site in Safari, choose **Share**, then **Add to Home Screen**.
- **Android:** open it in Chrome and choose **Install app** or **Add to Home screen**.
- **Desktop:** use the browser's install control when available.

After the first successful online load, the application shell is cached for offline use.

## Run locally

No build step is required. Serve the folder over HTTP so the service worker and Web Audio behavior match production:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Opening `index.html` directly is useful for a quick visual check, but browser security rules disable service workers on `file://` URLs.

## Privacy

Descent contains no accounts, analytics, advertising, tracking pixels, or remote API calls. Custom presets and preferences are saved in browser local storage on the current device.

Clearing browser storage removes those saved settings and presets.

## Scientific and safety framing

Binaural beats are perceived when the left and right ears receive slightly different tones. Research into their effects is mixed; reported effects are generally subtle and vary by person.

Descent is a meditation and sound-design tool, not a medical device. It does not diagnose, treat, cure, or prevent any condition, and it does not guarantee brainwave entrainment or a specific state of consciousness. Stop listening if the sound feels uncomfortable or destabilizing.

Descent is an independent project. It draws broad creative inspiration from descent-style contemplative practices, including the Monroe Institute's Gateway framework, but is not affiliated with or endorsed by the Monroe Institute and does not reproduce its recordings or protocols.

Sources to verify independently: Goyal et al., JAMA Internal Medicine, 2014 (meditation meta-analysis); Garcia-Argibay et al., Psychological Research, 2019 (binaural beats meta-analysis); Ingendoh et al., PLOS One, 2023 (brainwave entrainment review).

## Technology

- Pure HTML, CSS, and JavaScript
- Web Audio API
- Canvas-based reactive orb
- Web App Manifest and service worker
- Local storage for preferences and custom presets
- No framework, package manager, or build pipeline

## Repository structure

```text
index.html              Complete application and audio engine
manifest.json           Progressive Web App metadata
sw.js                   Offline application-shell cache
icon-512.png            Application icon
icons/                  Local interface and visual assets
LICENSE                 Descent's MIT license
THIRD_PARTY_NOTICES.md  Licenses for included third-party assets
CHANGELOG.md            Release history
```

## License

Descent is released under the [MIT License](LICENSE). Included Phosphor icon assets retain their own MIT notice in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

Made by Corbin Hoats and shared in case others find it useful.
