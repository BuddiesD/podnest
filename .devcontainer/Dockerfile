FROM golang:1.27.4-trixie

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        aardvark-dns \
        ca-certificates \
        catatonit \
        crun \
        curl \
        gcc \
        git \
        gnupg \
        iptables \
        libc6-dev \
        nftables \
        pkg-config \
        podman \
        restic \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_26.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g npm@12

RUN mkdir -p /var/lib/containers /run/podman \
    && printf '[storage]\ndriver = "vfs"\nrunroot = "/run/containers/storage"\ngraphroot = "/var/lib/containers/storage"\n' > /etc/containers/storage.conf \
    && printf '[engine]\ncgroup_manager = "cgroupfs"\nevents_logger = "file"\n' > /etc/containers/containers.conf

RUN git config --system core.fsmonitor false \
    && git config --system core.untrackedCache true \
    && git config --system core.preloadIndex true \
    && git config --system core.filemode false \
    && git config --system safe.directory /workspaces/podnest

RUN mkdir -p /opt/podnest/sites
