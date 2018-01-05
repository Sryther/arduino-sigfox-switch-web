FROM johnpapa/angular-cli

ADD . /app
ADD docker-entrypoint.sh /

WORKDIR /app

RUN chmod +x /docker-entrypoint.sh && \
  npm install

CMD ['/docker-entrypoint.sh']
