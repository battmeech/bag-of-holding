import { CampaignLog } from "@ui-views/Campaign/types";
import { FC } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { Avatar, Tooltip } from "@chakra-ui/react";

type LogTableProps = {
  logs: CampaignLog[];
};

export const LogTable: FC<LogTableProps> = ({ logs }) => {
  return (
    <TableContainer h="80vh" overflowY="scroll">
      <Table variant="simple" size="sm" borderColor="gray.300">
        <Thead>
          <Tr>
            <Th textTransform="lowercase">culprit</Th>
            <Th textTransform="lowercase">date</Th>
            <Th textTransform="lowercase">action</Th>
            <Th textTransform="lowercase">additional info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log) => (
            <Tr key={log.id}>
              <Td>
                <Tooltip label={log.user.name}>
                  <Avatar
                    aria-label="user avatar"
                    size="sm"
                    src={log.user.image || undefined}
                    name={log.user.name || undefined}
                  />
                </Tooltip>
              </Td>
              <Td>{new Date(log.date).toDateString()}</Td>
              <Td>{log.change}</Td>
              <Td>{log.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
