import { err, ok } from "neverthrow";

import { getBoardConfigRepository } from "../repositories/getBoardConfigRepository";

import type { VakContext } from "../../types/VakContext";
import type { ReadBoardConfig } from "../domain/read/ReadBoardConfig";
import type { Result } from "neverthrow";

export const getBoardConfigUsecase = async (
  dbContext: VakContext
): Promise<Result<ReadBoardConfig, Error>> => {
  const { logger } = dbContext;
  
  logger.debug({
    operation: "getBoardConfigUsecase",
    message: "Starting to fetch board configuration"
  });
  
  const config = await getBoardConfigRepository(dbContext);
  
  if (config.isErr()) {
    logger.error({
      operation: "getBoardConfigUsecase",
      error: config.error,
      message: "Failed to fetch board configuration"
    });
    return err(config.error);
  }
  
  logger.info({
    operation: "getBoardConfigUsecase",
    boardName: config.value.boardName.val,
    message: "Successfully retrieved board configuration"
  });
  
  return ok(config.value);
};
