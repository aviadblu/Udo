#!/bin/bash

pg_dump -h localhost -p 5432 -U udo -Fp --exclude-table-data=session -b -v -f ./sample_data/inserts.sql udo_db
